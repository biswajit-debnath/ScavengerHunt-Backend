const dotenv = require("dotenv").config();
const express = require("express")
const http = require("http")
const cors = require("cors")
const socketIo = require("socket.io")


const db = require("./config/config")
const PORT = process.env.PORT || 4000;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {authRoutes,userRoutes, notificationRoutes} = require("./routes/index");

const {notificationHandler} = require("./handlers/index")



app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",notificationRoutes)



const server = http.createServer(app)

const conn = socketIo(server,{
  cors: {
    origin: '*',
  }
})
notificationHandler.onNewConnection(conn)


server.listen(PORT, ()=> console.log("Server is listening at: ",PORT))

handleExit = async (signal) => {
    console.log(`Received ${signal}. Close my server properly.`);
    const pool = db.getPool();
    await pool.end();
    server.close(() => {
      console.log('Process terminated')
    })
};
process.on("SIGINT", handleExit);
process.on("SIGQUIT", handleExit);
process.on("SIGTERM", handleExit);