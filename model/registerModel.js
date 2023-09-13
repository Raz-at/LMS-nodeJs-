import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Name is required"],
        unique: false
    },
    roll:{
        type:String,
        required:[true , "roll is required"],
        enum: ['student', 'teacher' ]
    },
    email:{
        type:String,
        required:[true , "email is required"]
    },
    password:{
        type:String,
        required:[true , "password is required"]
    },
},
{
    timestamps:false
})

const registerModel = mongoose.model("register",registerSchema)

export default registerModel