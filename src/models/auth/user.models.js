import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Optional for OTP-based login
  },
  Flat_no: {
    type: String,
    required: true,
    unique: true,
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  // OTP fields for email-based authentication
  otpCode: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  otpAttempts: {
    type: Number,
    default: 0
  },
  loginMethod: {
    type: String,
    enum: ['password', 'otp'],
    default: 'password'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});
 
export const User = mongoose.model("User", userSchema, "users");
