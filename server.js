const express = require("express")
const cors = require("cors");

const db = require("./config/config")
const PORT = process.env.PORT || 3000;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {authRoutes} = require("./routes/index");



app.use("/api",authRoutes)


const server = app.listen(PORT, ()=> console.log("Server is listening at: ",PORT))

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