const express = require("express")
const userRouter = express.Router()

const {userController} = require("../controllers")

userRouter.get("/user/:id", userController.getUserInfoById)
userRouter.get("/users", userController.getAllUsers)


module.exports = userRouter