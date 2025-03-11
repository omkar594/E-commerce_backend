const orderService = require("../service/orderService.js")

const getAllOrders = async(req,res)=>{
    try{
        const orders = await orderService.getAllOrders()
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}

const confirmedOrders = async(req,res)=>{
    const orderId = req.params.orderId
    try{
        const orders = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}
const shippOrders = async(req,res)=>{
    const orderId = req.params.orderId
    try{
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}
const deliverOrders = async(req,res)=>{
    const orderId = req.params.orderId
    try{
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}

const cancelledOrders = async(req,res)=>{
    const orderId = req.params.orderId
    try{
        const orders = await orderService.cancelledOrder(orderId);
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}

const deleteOrders = async(req,res)=>{
    console.log("ok")
    const orderId = req.params.orderId
    try{
        const orders = await orderService.deleteOrder(orderId);
        console.log("In delete",orderId)
        return res.status(200).send(orders);
    }catch(e){
        return res.status(500).send({error:e.message})
    }
}

module.exports={
    getAllOrders,
    confirmedOrders,
    shippOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
}