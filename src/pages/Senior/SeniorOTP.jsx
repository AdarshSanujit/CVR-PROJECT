import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SeniorOTP.css";

function SeniorOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [error, setError] = useState("");

  /* =========================
     HANDLE OTP INPUT
  ========================= */

  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Remove previous error
    setError("");

    // Move to next OTP box
    if (value && index < 5) {
      const nextInput =
        document.getElementById(
          `otp-${index + 1}`
        );

      if (nextInput) {
        nextInput.focus();
      }
    }
  };


  /* =========================
     HANDLE BACKSPACE
  ========================= */

  const handleKeyDown = (e, index) => {

    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {

      const previousInput =
        document.getElementById(
          `otp-${index - 1}`
        );

      if (previousInput) {
        previousInput.focus();
      }

    }

  };


  /* =========================
     VERIFY OTP
  ========================= */

  const handleVerify = (e) => {

    e.preventDefault();

    const enteredOTP = otp.join("");

    console.log(
      "Entered OTP:",
      enteredOTP
    );


    /* Check 6 digits */

    if (enteredOTP.length !== 6) {

      setError(
        "Please enter the complete 6-digit OTP."
      );

      return;
    }


    /* Temporary OTP */

    if (enteredOTP === "123456") {

      console.log(
        "OTP verified successfully."
      );

      setError("");

      /*
        Navigate to Senior Dashboard
      */

      navigate(
        "/senior/dashboard"
      );

      return;
    }


    /* Wrong OTP */

    console.log(
      "Incorrect OTP."
    );

    setError(
      "Incorrect OTP. Please try again."
    );

  };


  /* =========================
     RESEND OTP
  ========================= */

  const handleResend = () => {

    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setError("");

    alert(
      "Demo OTP: 123456\n\nReal email OTP will be connected later."
    );


    /* Focus first box */

    const firstInput =
      document.getElementById(
        "otp-0"
      );

    if (firstInput) {
      firstInput.focus();
    }

  };


  /* =========================
     PAGE
  ========================= */

  return (

    <div className="otp-page">

      <div className="otp-card">

        {/* Logo */}

        <div className="otp-logo">
          C
        </div>


        {/* Heading */}

        <h1>
          Verify Your Email
        </h1>


        {/* Description */}

        <p className="otp-subtitle">

          We've sent a 6-digit
          verification code to
          your registered email
          address.

        </p>


        {/* OTP FORM */}

        <form
          onSubmit={handleVerify}
        >

          {/* OTP BOXES */}

          <div className="otp-inputs">

            {otp.map(
              (digit, index) => (

                <input
                  key={index}

                  id={`otp-${index}`}

                  type="text"

                  inputMode="numeric"

                  maxLength={1}

                  value={digit}

                  onChange={(e) =>
                    handleChange(
                      e.target.value,
                      index
                    )
                  }

                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index
                    )
                  }

                  autoComplete={
                    index === 0
                      ? "one-time-code"
                      : "off"
                  }
                />

              )
            )}

          </div>


          {/* ERROR MESSAGE */}

          {error && (

            <p className="otp-error">
              {error}
            </p>

          )}


          {/* VERIFY BUTTON */}

          <button
            type="submit"
            className="verify-button"
          >
            Verify OTP
          </button>

        </form>


        {/* RESEND OTP */}

        <button
          type="button"
          className="resend-button"
          onClick={handleResend}
        >
          Resend OTP
        </button>


        {/* BACK TO LOGIN */}

        <Link
          to="/senior/login"
          className="otp-back"
        >
          ← Back to Senior Login
        </Link>

      </div>

    </div>

  );

}

export default SeniorOTP;