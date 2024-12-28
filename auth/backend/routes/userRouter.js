import express from "express";
import {
  register,
  login,
  getProfile,
  checkRole,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", verifyToken, getProfile);
router.get("/admin", verifyToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Admin paneline hoş geldiniz" });
});

export default router;
