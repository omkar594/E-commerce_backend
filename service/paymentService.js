// const { default: customers } = require("razorpay/dist/types/customers")
const  razorpay = require("../config/razorpayClient.js")
const orderService = require("../service/orderService.js")

// console.log(Razorpay)

const createPaymentLink=async(orderId)=>{
    try{
        const order = await orderService.findOrderById(orderId)
        
        const paymentLinkRequest={
            amount:order.totalPrice*100,
            currency:"INR",
            customer:{
                name:`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
                contact:order.shippingAddress.mobile,
                email:order.users.email,
            },
            notify:{
                sms:true,
                email:true
            },
            reminder_enable:true,
            callback_url:`http://localhost:3000/payment/${orderId}`,
            callback_method:'get'
        }
        console.log("Ok i got it ",paymentLinkRequest)
        const paymentLink=await razorpay.paymentLink.create(paymentLinkRequest)

        console.log("this is the payment link ",paymentLink)

        const paymentLinkId=paymentLink.id
        const payment_link_url=paymentLink.short_url

        const resData={
            paymentLinkId,
            payment_link_url,
        }
        return resData
    }catch(e){
        throw new Error(e.message)
    }


}

const updatePaymentInformation = async(reqData)=>{
    const paymentId= reqData.payment_id
    const orderId=reqData.order_id

    try{
        const order = await orderService.findOrderById(orderId)

        const payment = await  razorpay.payments.fetch(paymentId)

        if(payment.status=="captured"){
            order.paymentDetails.paymentId=paymentId
            order.paymentDetails.status="COMPLETED";
            order.orderStatus="PLACED"

            await order.save()
        }

        const resData={message:"Your order is placed",success:true}

        return resData;
    }catch(e){
        throw new Error(e.message)


    }

}
module.exports = {
    createPaymentLink,
    updatePaymentInformation
}