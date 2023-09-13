import express from "express"
import registerController from "../controller/registerController/registerController.js";
import auth from "../middleware/auth.js"

const registerRouter = express.Router();

const RegisterController = new registerController();

registerRouter.post("/register",RegisterController.register)
registerRouter.post("/login",RegisterController.login)


registerRouter.use(auth)
registerRouter.get("/dashboard",RegisterController.show)


export default registerRouter