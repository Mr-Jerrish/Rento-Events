import express from "express";
import {
  signupUser,
  signinUser,
  changePassword,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/change-password", changePassword);

export default router;
