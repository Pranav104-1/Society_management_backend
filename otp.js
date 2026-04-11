import crypto from "crypto";

/**
 * Generate a random 6-digit OTP
 * @returns {string} - 6-digit OTP code
 */
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Generate expiry time (15 minutes from now)
 * @returns {Date} - Expiry timestamp
 */
export const getOTPExpiry = () => {
  return new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
};

/**
 * Check if OTP has expired
 * @param {Date} expiryTime - OTP expiry timestamp
 * @returns {boolean} - true if OTP is expired
 */
export const isOTPExpired = (expiryTime) => {
  return new Date() > new Date(expiryTime);
};

/**
 * Validate OTP attempt
 * @param {string} providedOTP - OTP provided by user
 * @param {string} storedOTP - OTP stored in database
 * @param {Date} expiryTime - OTP expiry time
 * @param {number} attempts - Current attempt count
 * @returns {object} - {isValid: boolean, message: string}
 */
export const validateOTP = (
  providedOTP,
  storedOTP,
  expiryTime,
  attempts = 0,
) => {
  if (attempts >= 5) {
    return {
      isValid: false,
      message: "Maximum OTP attempts exceeded. Please request a new OTP.",
    };
  }

  if (isOTPExpired(expiryTime)) {
    return {
      isValid: false,
      message: "OTP has expired. Please request a new OTP.",
    };
  }

  if (providedOTP !== storedOTP) {
    return { isValid: false, message: "Invalid OTP. Please try again." };
  }

  return { isValid: true, message: "OTP verified successfully." };
};
