import jwt from "jsonwebtoken";
import registerModel from "../../model/registerModel.js";
import userModel from "../../model/userModel.js";
import mongoose from "mongoose";
import "dotenv/config"

export default class registerController{
    async register(req,res){
        const { name,roll,email,password} = req.body
        
        
        const findUser = await registerModel.findOne({email})
        if(findUser)
        {
            res.status(400).json({status:false,message:"Already exits"})
        }
        else
        {
            const response = await registerModel.create({name,roll,email,password})
            if(response)
            {
                res.status(200).json({status:true,response}) 
            }
            else
            {
                res.status(400).json({status:false,message:"Error Occured"})
            }
        }


    }

    async login(req,res){
        const {email ,password} = req.body
        const findEmail = await registerModel.findOne({email})
        if(email)
        {
            if(findEmail.password === password)
            {
                const token = jwt.sign({findEmail } , process.env.SECRET_KEY , { expiresIn: '10m' })
                res.status(200).json({token})
            }
            else
            {
                res.status(400).json({status:false,message:"Password is incorrect..."})
            }
        }
        else
        {
            res.status(400).json({status:false,message:"No such email..."})
        }
        
        
    }

    async show(req,res){

        const {findEmail} = req.userinfo 
        const name = findEmail.name
        const roll = findEmail.roll

        const findUser = await userModel.find({name,roll})

        if(findUser)
        {
            res.status(200).json({findUser})
        }
        else
        {
            res.status(400).json({status:false,message:"User have no book"})
        }

        
    }
}