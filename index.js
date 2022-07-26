const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotels")
const roomRoutes = require("./routes/rooms")
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const bodyParser = require("body-parser");


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.status || "something went wrong"
   return res.status(500).json({
    succes: false,
    status:errorStatus,
    message:errorMessage,
    stack:error.stack
   })
})
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes)
app.use("/api/rooms", roomRoutes)

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
