const orderService = require("../service/orderService.js");

const createOrder=async(req,res)=>{
    const user =await req.user;
    try{
        
        let createdOrder = await orderService.createOrder(user,req.body);
        
        return res.status(201).send(createdOrder);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

const findOrderById=async(req,res)=>{
    const user = req.user;
    try{
        let createdOrder = await orderService.findOrderById(req.params.id);
        return res.status(201).send(createdOrder);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}


const orderHistory=async(req,res)=>{
    const user = req.user;
    try{
        let createdOrder = await orderService.userOrderHistory(user._id);
        return res.status(201).send(createdOrder);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
}

module.exports={
    orderHistory,
    createOrder,
    findOrderById,
}