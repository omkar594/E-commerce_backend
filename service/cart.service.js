
const Cart = require("../models/cart.model")
const Product = require("../models/product.model");
const CartItem = require("../models/cartItem.model");

async function createCart(user){
    try{
        const cart = new Cart({user});
        const createdCart=await cart.save();
        return createdCart;
    }catch(e){
        throw new Error(error.message);
    }
}

async function findUserCart(user){
    try{
        
        let cart = await Cart.findOne({user:user._id});
       
        let cartItems = await CartItem.find({cart:cart._id}).populate("product");


        cart.cartItems=cartItems

        let totalPrice=0;
        let totalDiscountPrice=0;
        let totalItem=0;

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price;
            totalDiscountPrice+=cartItem.discountPrice;
            totalItem+=cartItem.quantity;
        }

        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discount=totalPrice-totalDiscountPrice

        return cart;
    }catch(e){
        throw new Error(e.message);
    }
}

async function addCartItem(userId,req){
    try{
        const cart = await Cart.findOne({user:userId})
        if (!cart) {
            cart = await createCart(userId);
        }
        const product=await Product.findById(req.productId)
        if (!product) {
            throw new Error("Product not found");
        }
        const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId});
        if(!isPresent){
            const cartItem=new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                userId,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
            })
            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();

            return createdCartItem;
        }
        return isPresent; 
        
    }catch(e){
        throw new Error(e.message);
    }
}
module.exports = {createCart,findUserCart,addCartItem}