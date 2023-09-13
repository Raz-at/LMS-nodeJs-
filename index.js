import "express-async-errors"
import express from 'express'
import bookRoutes from "./controller/bookRoutes.js"
import registerRouter from "./controller/registerRoutes.js"
import mongoose from 'mongoose';
import "dotenv/config"
import errorhandle from "./handler/errorHandler.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/books",bookRoutes)
app.use("/",registerRouter)


mongoose.connect(process.env.MONGOOSE_CONN ,{}).then(()=>{
    console.log("Database connected successfully")
}).catch(()=>{
    console.log("Error connecting database")
})

app.use(errorhandle)

app.listen(8000,()=>{
        console.log("Running Succefully...")
})
