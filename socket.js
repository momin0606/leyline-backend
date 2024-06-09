const { Server } = require("socket.io");

const jwt = require("jsonwebtoken");
const { User } = require("./models");

const authenticate = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (user) {
      return user;
    }
  } catch (error) {
    return null;
  }
};

const clients = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("authenticate", async (token) => {
      const user = await authenticate(token);
      if (user) {
        socket.userId = user.id;
        clients.set(user.id, socket);
      } else {
        socket.disconnect();
      }
    });

    socket.on("disconnect", () => {
      clients.forEach((client, userId) => {
        if (client === socket) {
          clients.delete(userId);
        }
      });
    });
  });

  return io;
};

const notifyUsers = (userIds, message) => {
  userIds.forEach((userId) => {
    const clientSocket = clients.get(userId);
    console.log({ clientSocket, clients });
    if (clientSocket) {
      clientSocket.emit("notification", message);
    }
  });
};

module.exports = { initializeSocket, notifyUsers };
