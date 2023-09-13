import userModel from "../../model/userModel.js";
import bookModel from "../../model/bookModel.js";

export default class userController{
    async add(req,res){
        const {name,roll,book,author} = req.body;

        const findBook = await bookModel.findOne({name:book,author:author})
        if(findBook && findBook.available>0)
        {
            const userCount = await userModel.countDocuments({name,roll})
            
            if(userCount < 1 && roll === "student")
            {
                const findUser = await userModel.findOne({name,roll,book,author})
                if(!findUser)
                {
                    const taken_date = new Date();
                    
                    const addUser = await userModel.create({book_id:findBook._id,name,roll,book,author,taken_date,remaining_days:2,charge:0})
                    await bookModel.findOneAndUpdate({_id:findBook._id},{available:findBook.available-1})
        
                    res.status(200).json(addUser)
                }
                else
                {
                    res.status(500).json({status:false,message:"User has already has this book"})
                }
            }
            else if (userCount < 2 && roll ==="teacher")
            {
                const findUser = await userModel.findOne({name,roll,book,author})
                if(!findUser)
                {
                    const taken_date = new Date();
                    const addUser = await userModel.create({book_id:findBook._id,name,roll,book,author,taken_date,remaining_days:2,charge:0})
                    await bookModel.findOneAndUpdate({_id:findBook._id},{available:findBook.available-1})
        
                    res.status(200).json(addUser)
                }
                else
                {
                    res.status(500).json({status:false,message:"User has already has this book"})
                }
            }
            else
            {
                if(roll != "teacher" && userCount === 0 || roll != "student" && userCount === 0 )
                {
                    res.status(500).json({status:false,message:"Not accessible because you are nither a student nor a teacher..."})
                }
                res.status(500).json({status:false,message:"Already reach limit...."})
            }                  
        }
        else
        {
            res.status(500).json({status:false,message:"No book with such name"})
        }
    }

    async remove(req,res){
        const{name,roll,book,author} = req.body

        const findUser = await userModel.findOne({name,roll,book,author})
        if(findUser)
        {
            await userModel.findByIdAndDelete({_id:findUser._id})
            await bookModel.findByIdAndUpdate({_id:findUser.book_id},{$inc: { available: 1 }})
            res.status(200).json({status:true,message:"Book is returned"})
        }
        else
        {
            res.status(500).json({status:false,message:"No user with such name"})
        }
    }

    async searchUser(req,res){
        const{name  , roll} =req.query;
        const Users = await userModel.find({name,roll})      
        const currentDate = new Date();
        if (!Users || Users.length === 0)
        {                        
            res.status(500).json({status:false,message:"No user with this name"})
        }
        else
        {
            for(const user of Users)
            {
            const takenDate = user.taken_date;
            const remaining_days = currentDate - takenDate
            const remainingDays = remaining_days / (1000 * 60 * 60 * 24);

            user.remaining_days = 2 - Math.floor(remainingDays)
            if(user.remaining_days < 0 )
            {
                if(roll==="teacher")
                {
                    user.charge = "Rs "+ user.remaining_days * 10 * -1 
                    await userModel.updateOne({_id:user._id},{remaining_days:user.remaining_days , charge:user.charge})
                }
                else
                {
                    user.charge = "Rs "+ user.remaining_days * 5 * -1
                    await userModel.updateOne({_id:user._id},{remaining_days:user.remaining_days , charge:user.charge})
                }
                
            }
            else
            {
                await userModel.updateOne({_id:user._id},{remaining_days:user.remaining_days}) 
            }
            }
            res.status(200).json({ status: true, Users});
        }
    }

}