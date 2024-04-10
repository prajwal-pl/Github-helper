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
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();
console.log(__dirname);
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on port: 5000");
  connectDB();
});
