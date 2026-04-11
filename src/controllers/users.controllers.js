import { User } from "../models/auth/user.models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { generateOTP, getOTPExpiry, validateOTP } from "../../otp.js";
import { sendOTPEmail, sendVerificationEmail } from "../utils/email_verfying.js";
import { getOTPEmailTemplate, getVerificationSuccessTemplate, getWelcomeEmailTemplate } from "../utils/emailTemplates.js";

/**
 * Register a new user with email OTP-based authentication
 * POST /api/users/register-otp
 */
export const registerWithOTP = async (req, res) => {
  const { username, email, Flat_no } = req.body;

  try {
    if (!username || !email || !Flat_no) {
      return res.status(400).json({ message: "Username, email, and flat number are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { Flat_no }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user with OTP login method
    const newUser = new User({
      username,
      email,
      Flat_no,
      loginMethod: 'otp',
      is_verified: false,
    });

    await newUser.save();

    // Send welcome email
    try {
      const template = getWelcomeEmailTemplate(username, Flat_no);
      await sendVerificationEmail({
        to: email,
        subject: template.subject,
        text: template.text,
        html: template.html,
      });
    } catch (emailError) {
      console.error("Welcome email send error:", emailError);
      // Don't fail the registration if email fails
    }

    res.status(201).json({
      message: "User registered successfully. Please check your email for further instructions.",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Request OTP for login
 * POST /api/users/request-otp
 */
export const requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update user with OTP
    user.otpCode = otp;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = 0;
    await user.save();

    // Send OTP email
    try {
      const template = getOTPEmailTemplate(otp, user.username);
      await sendOTPEmail({
        to: email,
        subject: template.subject,
        text: template.text,
        html: template.html,
      });
    } catch (emailError) {
      console.error("OTP email send error:", emailError);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(200).json({
      message: "OTP sent to your email",
      email: email,
      expiresIn: "15 minutes",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Verify OTP and login
 * POST /api/users/verify-otp
 */
export const verifyOTPLogin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate OTP
    const validation = validateOTP(otp, user.otpCode, user.otpExpiry, user.otpAttempts);

    if (!validation.isValid) {
      // Increment attempts
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save();
      return res.status(401).json({ message: validation.message, attempts: user.otpAttempts });
    }

    // Clear OTP fields and mark as verified
    user.otpCode = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    user.is_verified = true;
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        Flat_no: user.Flat_no,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Resend OTP
 * POST /api/users/resend-otp
 */
export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    user.otpCode = otp;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = 0;
    await user.save();

    // Send OTP email
    try {
      const template = getOTPEmailTemplate(otp, user.username);
      await sendOTPEmail({
        to: email,
        subject: template.subject,
        text: template.text,
        html: template.html,
      });
    } catch (emailError) {
      console.error("OTP email send error:", emailError);
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.status(200).json({
      message: "OTP resent to your email",
      email: email,
      expiresIn: "15 minutes",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



/**
 * Register a new user with password 
 */
export const createUser = async (req, res) => {
  const { username, email, password, Flat_no } = req.body;
  console.log(req.body);
  try {
    if (!username || !email || !password || !Flat_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

  
    const existingUser = await User.findOne({
      $or: [{ email: email }, { Flat_no: Flat_no }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      Flat_no,
      loginMethod: 'password',
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle duplicate key error from DB if unique indexes are set
    if (error && (error.code === 11000 || error.name === "MongoServerError")) {
      return res
        .status(409)
        .json({ message: "User already exists", error: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
/**
 * Login with password (legacy method)
 */

export const loginUser = async (req, res) => {
  const { email, password, Flat_no } = req.body;
  if (!email || !password || !Flat_no) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email, Flat_no });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      // Update last login time
      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user);

      // Set cookie with token
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.status(200).json({
        message: "Login successful",

        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          Flat_no: user.Flat_no,
        },
      });
    } catch (error) {
      console.error("Token Generation Error:", error);
      return res.status(500).json({
        message: "Error generating authentication token",
        error: error.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
/**
 * Logout user
 */
      .json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Update user's last activity
    if (req.user && req.user.id) {
      await User.findByIdAndUpdate(req.user.id, {
        $set: { lastLogout: new Date() },
      });
    }

    res.status(200).json({ message: "Logout successful" });}
/**
 * Get user by flat number
 */
export const getUser = async (req, res) => {
  try {
    // Only accept flat number from params for consistency
    const Flat_no = req.params?.Flat_no;
    if (!Flat_no) {
      return res.status(400).json({ message: "Flat number is required" });
    }
    const user = await User.findOne({ Flat_no }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true },
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

