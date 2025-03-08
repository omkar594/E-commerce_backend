const paymentService = require("../service/paymentService.js");

const createPaymentLink = async(req,res)=>{
    const id=await req.params.id;
    try{
        const paymentLink = await paymentService.createPaymentLink(id)
        
        return res.status(200).send(paymentLink)
    }catch(e){
        return res.status(500).send(e.message)
    }
};

const updatePaymentInformation = async(req,res)=>{

    try{
        await paymentService.updatePaymentInformation(req.query)
        return res.status(200).send({message: "Payment information update",status:true})
    }catch(e){
        return res.status(500).send(e.message)
    }
};


module.exports = {
    createPaymentLink,
    updatePaymentInformation
} 