const mongoose=require('mongoose');
import { models } from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    tasks: {
        type: [{type:mongoose.Schema.Types.ObjectId,ref:'Task'}] 
    },
},{timestamps:true});

const User=models.User || mongoose.model('User',userSchema);

export default User;