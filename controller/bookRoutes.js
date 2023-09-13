import express from "express"
import bookController from "./bookController/bookController.js"
import userController from "./userController/userController.js"
const Router = express.Router();

const BookController = new bookController;
const UserController = new userController;

Router.get("/",BookController.allBooks)
Router.post("/addBook",BookController.addBook)
Router.get("/search", BookController.search);
Router.get("/search/user",BookController.userBook)


Router.post("/add",UserController.add)
Router.post("/remove",UserController.remove)

Router.get("/get",UserController.searchUser)


export default Router