import { useState } from "react";
import "./SeniorLogin.css";

function SeniorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend navigation.
    // Real email/password verification and OTP
    // will be connected to the backend later.

    window.location.href = "/senior/otp";
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          C
        </div>

        {/* Heading */}
        <h1>Senior Login</h1>

        <p className="auth-subtitle">
          Login to your CVR ProjectHub account
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <label htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your university email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot Password */}
          <div className="forgot-row">
            <a href="/senior/forgot-password">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {/* Signup Section */}
        <div className="auth-divider">
          Don't have an account?
        </div>

        <a
          href="/senior/signup"
          className="signup-link"
        >
          Create Senior Account
        </a>

      </div>

    </div>
  );
}

export default SeniorLogin;