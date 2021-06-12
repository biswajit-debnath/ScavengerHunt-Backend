const {sendNotification} = require("./handlers/index")
const AllOnlineUser = require("./onlineUsers")

const extractUserIds = (data) => {
    return data.map(user => user.userid );
}

const getOnlyOnlineUsers = (ourUsers,AllOnlineUser) => {
    return Object.keys(AllOnlineUser).filter(onlineUser => ourUsers.indexOf(onlineUser) != -1)
}

const sendNotificationToAllUsers = (users,data) => {
    users.forEach(user=> {
        sendNotification(AllOnlineUser[user], data.message)
    })
}

module.exports = {
    extractUserIds,
    getOnlyOnlineUsers,
    sendNotificationToAllUsers
}