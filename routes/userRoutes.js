const express = require("express")
const userRouter = express.Router()

const {userController} = require("../controllers")

userRouter.get("/user/:id", userController.getUserInfoById)
userRouter.get("/users", userController.getAllUsers)
userRouter.get("/usersbypin/:pin", userController.getUsersByPin)



module.exports = userRouter