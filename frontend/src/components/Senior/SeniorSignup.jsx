import { useState } from "react";
import "./SeniorSignup.css";

function SeniorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Senior Signup Data:", formData);

    // Real OTP and account creation
    // will be connected to the backend later.
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-logo">
          C
        </div>

        <h1>Create Senior Account</h1>

        <p className="signup-subtitle">
          Join CVR ProjectHub and share your project knowledge.
        </p>

        <form onSubmit={handleSignup}>

          <label htmlFor="name">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="registrationNumber">
            University Registration Number
          </label>

          <input
            id="registrationNumber"
            name="registrationNumber"
            type="text"
            placeholder="Enter your registration number"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">
            University Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your university email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="signup-submit"
          >
            Continue to Email Verification
          </button>

        </form>

        <p className="already-account">
          Already have an account?
        </p>

        <a
          href="/senior/login"
          className="back-login"
        >
          ← Back to Senior Login
        </a>

      </div>

    </div>
  );
}

export default SeniorSignup;