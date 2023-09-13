import mongoose from "mongoose";

const bookScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true ,"Book Name is required"]
    },
    author:{
        type:String,
        required:[true ,"Author Name is required"]
    },
    available:
    {
        type:Number,
        required:[true ,"Quality is required"]
    }
})

const bookModel=mongoose.model("Books",bookScheme)

export default bookModel