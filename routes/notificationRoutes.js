const express = require("express")
const notificationRouter = express.Router()
const {authHandler}  = require("./../handlers/index")

const {notificationController} = require("../controllers")

notificationRouter.get("/notifications/:userid",authHandler.verifyHash, notificationController.getAllNotificationByUserId)
notificationRouter.get("/notifications/read/:userid",authHandler.verifyHash, notificationController.transferNewNotificationsToOld)

module.exports = notificationRouter