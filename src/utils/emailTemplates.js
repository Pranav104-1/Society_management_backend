/**
 * Email template functions for OTP-based authentication
 */

/**
 * OTP verification email template
 * @param {string} otp - The OTP code to send
 * @param {string} userName - Username of the recipient
 * @returns {object} - {subject, text, html}
 */
export const getOTPEmailTemplate = (otp, userName = 'User') => {
  return {
    subject: '🔐 Your OTP Verification Code - SocietyWeb',
    text: `
Hello ${userName},

Your One-Time Password (OTP) for SocietyWeb login is: ${otp}

This OTP is valid for 15 minutes. Please do not share it with anyone.

If you didn't request this code, please ignore this email.

Best regards,
SocietyWeb Team
    `,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            color: #333;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .otp-section {
            background: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 6px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
        }
        .otp-label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        .otp-code {
            font-size: 38px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin: 15px 0;
        }
        .otp-expiry {
            color: #ff6b6b;
            font-size: 13px;
            font-weight: 500;
            margin-top: 10px;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #856404;
            font-size: 14px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
        .security-note {
            color: #666;
            font-size: 13px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 SocietyWeb</h1>
            <p>Email Verification</p>
        </div>
        <div class="content">
            <p class="greeting">Hello <strong>${userName}</strong>,</p>
            <p>Thank you for logging in to SocietyWeb! To verify your email and complete your login, please use the following code:</p>
            
            <div class="otp-section">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-expiry">⏰ Valid for 15 minutes</div>
            </div>
            
            <div class="warning">
                <strong>⚠️ Security Alert:</strong> Never share this code with anyone. Our team will never ask for it via email or phone.
            </div>
            
            <p class="security-note">If you didn't request this login, please ignore this email and make sure your account is secure.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024-2026 SocietyWeb. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
        </div>
    </div>
</body>
</html>
    `
  }
}

/**
 * Email verification success template
 * @param {string} userName - Username of the recipient
 * @returns {object} - {subject, text, html}
 */
export const getVerificationSuccessTemplate = (userName = 'User') => {
  return {
    subject: '✅ Email Verified - SocietyWeb Account',
    text: `
Hello ${userName},

Congratulations! Your email has been successfully verified. Your SocietyWeb account is now active and ready to use.

You can now access all features of SocietyWeb.

Best regards,
SocietyWeb Team
    `,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .success-badge {
            font-size: 64px;
            margin: 20px 0;
        }
        .message {
            color: #333;
            font-size: 16px;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Email Verified!</h1>
        </div>
        <div class="content">
            <div class="success-badge">🎉</div>
            <p class="message">Hello <strong>${userName}</strong>,</p>
            <p class="message">Congratulations! Your email has been successfully verified. Your SocietyWeb account is now fully active.</p>
            <p class="message">You can now access all features and services of SocietyWeb.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024-2026 SocietyWeb. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `
  }
}

/**
 * Welcome email template for new user registration
 * @param {string} userName - Username of the recipient
 * @param {string} flatNo - Flat number
 * @returns {object} - {subject, text, html}
 */
export const getWelcomeEmailTemplate = (userName = 'User', flatNo = '') => {
  return {
    subject: '👋 Welcome to SocietyWeb!',
    text: `
Hello ${userName},

Welcome to SocietyWeb! Your account has been successfully created.

Flat Number: ${flatNo}

You can now log in using your email and OTP code.

Best regards,
SocietyWeb Team
    `,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            color: #333;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .details {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .detail-row {
            margin: 10px 0;
            color: #333;
        }
        .label {
            font-weight: bold;
            color: #667eea;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>👋 Welcome to SocietyWeb!</h1>
        </div>
        <div class="content">
            <p class="greeting">Hello <strong>${userName}</strong>,</p>
            <p>Thank you for registering with SocietyWeb. Your account has been successfully created!</p>
            
            <div class="details">
                <div class="detail-row"><span class="label">Username:</span> ${userName}</div>
                <div class="detail-row"><span class="label">Flat Number:</span> ${flatNo}</div>
            </div>
            
            <p>You can now log in using your email and OTP code. You'll receive a verification code via email for each login attempt.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024-2026 SocietyWeb. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `
  }
}
