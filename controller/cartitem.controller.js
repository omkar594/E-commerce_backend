const cartItemService=require("../service/cartItem.service.js");

const updateCartItem=async(req,res)=>{
    const user = await req.user;
    try{
        const updatedCartItem = await cartItemService.updateCartItem(user._id,req.params.id,req.body);
        return res.status(200).send(updatedCartItem);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const removeCartItem=async(req,res)=>{
    const user = await req.user;
    try{
        await cartItemService.removeCartItem(user._id,req.params.id);
        console.log("cartItemService",cartItemService);
        return res.status(200).send({message:"Cart Item Remove Successfully"});
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

module.exports = {updateCartItem,removeCartItem};