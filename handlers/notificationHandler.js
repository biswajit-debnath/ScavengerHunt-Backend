const OnlineUsers = require("./../onlineUsers");
const {notificationService} = require("./../services")


const onNewConnection =async (conn) => {
    console.log("function runned");
    conn.on("connection",async (socket) =>{
        
        const userId = socket.handshake.query.userId;
        OnlineUsers[userId] = socket;

        try{
            const newNotifications =await notificationService.newNotificationCountByid(userId);
            socket.emit("notification", newNotifications.count)
        }catch(err){
            console.log(err);
        }
        

        socket.on("disconnect", ()=> {
            console.log("User disconnected with id:",userId);
            delete OnlineUsers[userId]
        })
    })
}


const sendNotification =async (socket,data) => {
    socket.emit("notification", data)
}


module.exports ={
    onNewConnection,
    sendNotification
}