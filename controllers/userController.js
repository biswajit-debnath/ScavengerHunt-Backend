const { userService,notificationService } = require("../services")
const helper = require("./../helper")

const getUserInfoById = async (req, res) => {
    try{
        const id = req.params.id

        const userData = await userService.getUserInfoById(id)
        const pincodes = await userService.getAllPincodesById(id)

        const mergedData = {...userData, pincodes}

        res.status(200).json(mergedData)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}
    
const getAllUsers = async (req, res) => {
    try{
        const {adminid} = req.params
        const users = await userService.getAllUsers(adminid)
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)
    }
}
    
const getUsersByPin = async (req, res) => {
    try{
        const {pin} = req.params
        const dataForNotification={message:pin,timeStamp:Date.now()}
        const users = await userService.getUsersByPin(pin)
        dataForNotification["users"] = helper.extractUserIds(users);
        dataForNotification["users"].push(0) //For admin
        const allOnlineUserFromOurList = helper.getOnlyOnlineUsers(dataForNotification["users"])

        await notificationService.storeNotification(dataForNotification)
        console.log(allOnlineUserFromOurList);
        res.status(200).json(users)
        helper.sendNotificationToAllUsers(allOnlineUserFromOurList,"increment")


    }catch(err){
        console.log(err)
        res.status(err.status).send(err.message)

    }
}

module.exports ={
    getUserInfoById,
    getAllUsers,
    getUsersByPin
}