import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

//Gateway initiaize
const  stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// global variable
const currency = "usd"
const deliveryCharges = 10;

//placing ordes using COD

const placeOrder = async (req, res) => {
    try{

        const {userId , items , amount , address} = req.body;
    
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date: Date.now(),
        }

        const newModel=new orderModel(orderData);
        await newModel.save();

        await userModel.findByIdAndUpdate(userId , {cartData:{}});
        res.json({success:true, message:"Order placed successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});

    }

}

const placeOrderStripe = async (req, res) => {
    try{
        const {userId, items , amount , address } = req.body;
        const {origin} = req.headers;
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data:{
                currency:currency,
                product_data : {    
                    name:'Delivery Charges'
                }, 
                unit_amount: deliveryCharges * 100
            },
            quantity:1
        })

        const session= await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'

        })
        res.json({success:true, session_url:session.url});


    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message});  
    }     

}

//verifyStripe payment
const verifyStripe = async (req, res) => {
    const {orderId, success , userId} = req.body;
    try{
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
             res.json({success:true, message:"Payment verified successfully"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Payment failed"});
        }
       
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }

}
const verifyRazorpay = async (req, res) => {
    try{
        const {userId,razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt , {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success:true, message:"Payment verified successfully"});

        }else{
            res.json({success:false, message:"Payment verification failed"});
        }

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}



const placeOrderRazorpay = async (req, res) => {
    try{
        const {userId, items , amount , address } = req.body;
      
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now(),
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Razorpay order creation failed" });
            } else {
                res.json({ success: true, order, razorpayKey: process.env.RAZORPAY_KEY_ID });
            }
        });

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message});

    }

}

//All orders data for admin panel
const allOrders = async (req, res) => {

    try{

        const orders = await orderModel.find({});
        res.json({success:true, orders});

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message});

    }

}

//UserOrder Data for frontend
const userOrders = async (req, res) => {
    try{
        const userId = req.userId;
        const orders = await orderModel.find({userId})
        res.json({success:true, orders});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }

}

//updata order status from admin
const updateStatus = async (req, res) => {
    try{
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success:true, message:"Status updated successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }

}

export {verifyRazorpay, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };