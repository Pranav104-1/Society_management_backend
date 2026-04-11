// OTPLoginForm.jsx
// Simple React component for OTP-based login and registration

import React, { useState } from 'react';
import './OTPLoginForm.css';

const OTPLoginForm = () => {
  const [step, setStep] = useState('login-choice'); // login-choice, register, request-otp, verify-otp
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    Flat_no: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [timer, setTimer] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Show message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Register with OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users/register-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          Flat_no: formData.Flat_no,
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', 'Registration successful! Redirecting to login...');
        setTimeout(() => {
          setStep('login-choice');
          setFormData({ username: '', email: '', Flat_no: '', otp: '' });
        }, 2000);
      } else {
        showMessage('error', data.message || 'Registration failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', 'OTP sent to your email!');
        setStep('verify-otp');
        setTimer(900); // 15 minutes in seconds
      } else {
        showMessage('error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', 'Login successful! Redirecting...');
        // Store token or redirect to dashboard
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        showMessage('error', data.message || 'OTP verification failed');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/users/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        showMessage('success', 'OTP resent successfully!');
        setTimer(900);
      } else {
        showMessage('error', data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Timer effect
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-login-container">
      <div className="otp-login-card">
        <div className="otp-header">
          <h1>🔐 SocietyWeb</h1>
          <p>Email-Based Login</p>
        </div>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Step 1: Login Choice */}
        {step === 'login-choice' && (
          <div className="step-content">
            <h2>Choose Authentication Method</h2>
            <button
              onClick={() => setStep('request-otp')}
              className="btn btn-primary btn-large"
            >
              📧 Login with OTP
            </button>
            <button
              onClick={() => setStep('register')}
              className="btn btn-secondary btn-large"
            >
              ✍️ New User? Register
            </button>
          </div>
        )}

        {/* Step 2: Register */}
        {step === 'register' && (
          <form onSubmit={handleRegister} className="step-content">
            <h2>Create Account</h2>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Flat_no">Flat Number</label>
              <input
                type="text"
                id="Flat_no"
                name="Flat_no"
                value={formData.Flat_no}
                onChange={handleChange}
                placeholder="Enter your flat number"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <button
              type="button"
              onClick={() => setStep('login-choice')}
              className="btn btn-link"
            >
              Back to Login
            </button>
          </form>
        )}

        {/* Step 3: Request OTP */}
        {step === 'request-otp' && (
          <form onSubmit={handleRequestOTP} className="step-content">
            <h2>Login with OTP</h2>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('login-choice');
                setFormData({ ...formData, email: '', otp: '' });
              }}
              className="btn btn-link"
            >
              Back
            </button>
          </form>
        )}

        {/* Step 4: Verify OTP */}
        {step === 'verify-otp' && (
          <form onSubmit={handleVerifyOTP} className="step-content">
            <h2>Verify OTP</h2>
            
            <p className="info-text">
              We've sent a 6-digit code to <strong>{formData.email}</strong>
            </p>

            <div className="form-group">
              <label htmlFor="otp">Enter OTP Code</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="000000"
                maxLength="6"
                required
                className="otp-input"
              />
            </div>

            {timer > 0 && (
              <div className="timer">
                ⏰ Code expires in: <strong>{formatTime(timer)}</strong>
              </div>
            )}

            {timer <= 0 && (
              <div className="timer expired">
                ⚠️ Code has expired. Please request a new one.
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || timer <= 0}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              className="btn btn-secondary"
              disabled={loading || timer > 300}
            >
              {timer > 300 ? `Resend OTP (${Math.floor(timer / 60)}m left)` : 'Resend OTP'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('login-choice');
                setFormData({ ...formData, otp: '' });
                setTimer(0);
              }}
              className="btn btn-link"
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="otp-footer">
          <p>🔒 Your data is secure with us</p>
        </div>
      </div>
    </div>
  );
};

export default OTPLoginForm;
