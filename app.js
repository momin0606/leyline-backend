const express = require("express");

const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const settlementRoutes = require("./routes/settlements");
const http = require("http");
const cors = require("cors");
const { initializeSocket } = require("./socket");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
initializeSocket(server);
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/settlements", settlementRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
