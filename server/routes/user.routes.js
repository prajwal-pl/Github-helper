import express from "express";
import {
  getLikes,
  getUserProfileAndRepos,
  LikeProfile,
} from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, LikeProfile);

export default router;
