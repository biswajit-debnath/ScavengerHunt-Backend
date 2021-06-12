const OnlineUsers = require("./../onlineUsers");


// Client side
// const socket = io({
//     query: { userId: 1 }
//   });

const onNewConnection =async (conn,onlineUsers) => {
    console.log("New User by id:",userId);
    conn.on("connection", socket =>{

        OnlineUsers[userId] = socket.handshake.query.userId;

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