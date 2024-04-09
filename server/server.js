import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server testing...");
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port: 5000");
});
