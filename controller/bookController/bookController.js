import bookModel from "../../model/bookModel.js";
import mongoose from "mongoose";
import userModel from "../../model/userModel.js";

export default class bookController{
    //to add books
    async addBook(req,res){
        const { name , author , available} = req.body;
        const findBook = await bookModel.findOne({name,author})
        if(findBook){
            res.status(500).json({status:false,message:"There is already a book with this name and author"})
        }
        else
        {
            const response = await bookModel.create({name,author,available})
            console.log(response)
            if(response)
            {
                res.status(200).json({response})
            }
        }
    }

    async allBooks(req,res){
        const response = await bookModel.find({})
        res.status(200).json({status:true,response})
    }

    async search(req,res){
        const{name,author} = req.query

        const query ={}
        if (name) 
        {
            query.name = name;
        }      
        if (author) {
        query.author = author;
        }

        const findBook = await bookModel.find(query)        
        if(findBook)
        {
            res.status(200).json({status:true,findBook})
        }
        else
        {
            res.status(500).json({status:false,message:"Noo book found"})
        }
    }

    async userBook(req,res){
        const {name} = req.query
        const response = await userModel.find({book:name})
        if(response)
        {
            res.status(200).json(response)
        }
        else
        {
            res.status(500).json({status:false,message:"No a single book"})
        }
    }

}