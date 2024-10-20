const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { json } = require("body-parser");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Connection to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connection to database established!"))
  .catch((err) => console.error(err));

io.on('connection',(socket)=>{
    console.log('User conencted');

    socket.on('task-added', (task) => {
        io.emit('task-added', task);    // To notify all clients
    });

    socket.on('task-updated', (updatedTask)=>{
        io.emit('task-updated', updatedTask);
    });

    socket.on('task-completed', (taskId)=>{
        io.emit('task-completed', taskId);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT,()=> console.log('Server running on port ${PORT}'));