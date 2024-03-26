// Nhập các module cần thiết
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Phục vụ tệp HTML khi URL gốc được truy cập
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Xử lý kết nối đến máy chủ Socket.IO
io.on("connection", (socket) => {
  console.log("Người dùng đã kết nối");
  // Lắng nghe các sự kiện 'on-chat' từ các máy khách
  socket.on("on-chat", (data) => {
    // Phát tin nhắn nhận được đến tất cả các máy khách
    io.emit("user-chat", { name: data.name, message: data.message });
  });
});

// Bắt đầu máy chủ lắng nghe trên cổng 3000
server.listen(3000, () => {
  console.log("Đang lắng nghe trên cổng 3000");
});
