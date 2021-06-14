const { notificationService } = require("../services")
const helper = require("./../helper")

const getAllNotificationByUserId = async (req, res) => {
    try{
        const userid = req.params.userid

        const notificationData = await notificationService.getAllNotificationByUserId(userid)

        res.status(200).json(notificationData)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}

const transferNewNotificationsToOld = async (req, res) => {
    try{
        const userid = req.params.userid

        const notificationData = await notificationService.transferNewNotificationsToOld(userid)

        res.status(200).json(notificationData)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}


module.exports ={
    getAllNotificationByUserId,
    transferNewNotificationsToOld
}