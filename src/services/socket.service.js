import { Server } from "socket.io";

let io;
const userSocketMap = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("join", (userId) => {
      addUserToRoom(userId, socket.id);
    });

    socket.on("leave", (userId) => {
      removeUserFromRoom(userId, socket.id);
    });

    socket.on("disconnect", () => {
      removeUserFromAllRooms(socket.id);
      console.log("user disconnected", socket.id);
    });
  });
};

export const emitToUsers = (userIds, event, message, data) => {
  const uniqueUserIds = Array.from(new Set(userIds));
  uniqueUserIds.forEach((userId) => {
    const socketId = userSocketMap.get(userId);
    if (socketId) {
      io.to(socketId).emit(event, { message, data });
    }
  });
};

export const addUserToRoom = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
  io.sockets.sockets.get(socketId)?.join(userId);
};

export const removeUserFromRoom = (userId, socketId) => {
  userSocketMap.delete(userId);
  io.sockets.sockets.get(socketId)?.leave(userId);
};

const removeUserFromAllRooms = (socketId) => {
  for (const [userId, id] of userSocketMap.entries()) {
    if (id === socketId) {
      userSocketMap.delete(userId);
    }
  }
};
