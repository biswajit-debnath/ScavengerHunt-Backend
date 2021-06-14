const express = require("express")
const userRouter = express.Router()
const {authHandler}  = require("./../handlers/index")

const {userController} = require("../controllers")

userRouter.get("/user/:id", userController.getUserInfoById)
userRouter.get("/users/:adminid", authHandler.verifyHash , userController.getAllUsers)
userRouter.get("/usersbypin/:pin", userController.getUsersByPin)



module.exports = userRouter