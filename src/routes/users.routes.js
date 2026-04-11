import { Router } from "express";
import {
  createUser,
  loginUser,
  logout,
  getUser,
  registerWithOTP,
  requestOTP,
  verifyOTPLogin,
  resendOTP,
} from "../controllers/users.controllers.js";
import rateLimit from "express-rate-limit";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: "error",
    message: "Too many registration requests. Please try again later.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    status: "error",
    message: "Too many login attempts. Please try again later.",
  },
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: "error",
    message: "Too many OTP requests. Please try again later.",
  },
});

router.post("/register-otp", registerLimiter, registerWithOTP);

router.post("/request-otp", otpLimiter, requestOTP);

router.post("/verify-otp", loginLimiter, verifyOTPLogin);

router.post("/resend-otp", otpLimiter, resendOTP);

router.post("/register", registerLimiter, createUser);

router.post("/login", loginLimiter, loginUser);

router.post("/logout", authMiddleware, logout);

router.get("/user/:Flat_no", authMiddleware, getUser);

export default router;
