const {notificationHandler} = require("./handlers/index")
const AllOnlineUser = require("./onlineUsers")

const extractUserIds = (data) => {
    return data.map(user => user.userid );
}

const getOnlyOnlineUsers = (ourUsers) => {
    return Object.keys(AllOnlineUser).filter(onlineUser => ourUsers.indexOf(parseInt(onlineUser)) != -1)
}

const sendNotificationToAllUsers = (users,data) => {
    users.forEach(user=> {
        notificationHandler.sendNotification(AllOnlineUser[user], data)
    })
}

module.exports = {
    extractUserIds,
    getOnlyOnlineUsers,
    sendNotificationToAllUsers
}