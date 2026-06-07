import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";

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

}

const placeOrderRazorpay = async (req, res) => {

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

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };