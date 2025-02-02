
const cartService = require("../service/cart.service.js");

const findUserCart=async(req,res)=>{
    const user = await req.user;
    try{
     
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart);
    }catch(e){
        
        return res.status(500).send({error: e.message});
    } 
}


const addItemToCart=async(req,res)=>{
    const user = await req.user;
    try{
        const cartItem = await cartService.addCartItem(user._id,req.body)
        return res.status(200).send({cartItem:cartItem});
    }catch(e){
        return res.status(500).send({error:e.message});
    } 
}

module.exports = {findUserCart, addItemToCart};