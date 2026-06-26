import express from "express";
import { saleDataRoute } from "./src/services/Routes/salesDataRoute.js";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { setupRealtimeListener } from "./src/services/middleware/realtimeListener.js";
import cors from "cors";

const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { cors: { origin: "*" } });
const PORT = 8000;

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

app.use(express.json());
app.use("/sales", saleDataRoute);

app.listen(PORT, () => console.log(`Currently listening to Port ${PORT}`));
