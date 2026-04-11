import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Create and return SMTP transporter configuration
 */
const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true" || false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
};

/**
 * Generic email sending function
 */
const sendEmail = async ({ to, subject, text, html }) => {
  if (!to) throw new Error("Missing recipient email");

  const transporter = getTransporter();

  const mail = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.GMAIL_USER,
    to,
    subject,
    text,
    html,
  });

  return mail;
};

/**
 * Send verification email
 */
export const sendVerificationEmail = async ({
  to,
  subject = "Verify your email",
  text,
  html,
}) => {
  return await sendEmail({ to, subject, text, html });
};

/**
 * Send OTP email
 */
export const sendOTPEmail = async ({
  to,
  subject = "Your OTP Code",
  text,
  html,
}) => {
  return await sendEmail({ to, subject, text, html });
};

/**
 * Backward compatibility
 */
export const sendoptemail = async ({
  to,
  subject = "Your OTP Code",
  text,
  html,
}) => {
  return await sendOTPEmail({ to, subject, text, html });
};
