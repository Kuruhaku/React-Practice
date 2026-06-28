import express from "express";
import { saleDataRoute } from "./routes/salesRoute";
import cors from "cors";

const app = express();
const PORT = 8000;

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOption));
app.use("/sale", saleDataRoute);

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
