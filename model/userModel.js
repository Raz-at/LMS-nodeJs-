import mongoose, { mongo } from "mongoose";

const userScheme = new mongoose.Schema({
    book_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    },    
    name:{
        type:String,
        required:[true , "name is required"]
    },
    roll:{
        type:String,
        required:[true , "Roll is required"],
        enum: ['student', 'teacher' ],
    },
    book:{
        type:String,
        required:[true , "Book name is required"]
    },
    author:{
        type:String,
        required:[true , "Author name is required"]
    },
    taken_date:{
        type:Date,
        //required:true
    },
    remaining_days:{
        type:Number,
        required:false
    },
    charge:{
        type:String,
        required:false
    }
    
},
{
    timestamps:true
})

const userModel = mongoose.model("users",userScheme)

export default userModel