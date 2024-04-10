import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import session from "express-session";
import passport from "passport";
import "./passport/github.auth.js";

dotenv.config();
const app = express();
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server testing...");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(5000, () => {
  console.log("Server running on port: 5000");
  connectDB();
});
