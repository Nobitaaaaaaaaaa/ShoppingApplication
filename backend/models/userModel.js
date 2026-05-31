import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }

},{minimize:false})
// we have written minimize false because we want to store empty object in cartData field when user is created. If we do not write minimize false then mongoose will not store empty object in cartData field and it will be undefined.

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;