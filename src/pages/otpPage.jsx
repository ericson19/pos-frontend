import { useState, useRef } from "react";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/navbar.jsx";
import { success, failed } from "../services/helper.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next input automatically
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleSubmit = async () => {
    const code = otp.join("");
    console.log("Submitted OTP:", code);
    console.log("Email from localStorage:", localStorage.getItem("email"));

    // Add your OTP verification logic here
    try {
      const email = localStorage.getItem("email");
      const storeId = localStorage.getItem("storeId");
      const otpExpired = localStorage.getItem("otpExpiry");

      let response;
      if (storeId) {
        console.log("otp: " + code);
        const formData = {
          email: email,
          storeId: storeId,
          otp: code,
        };
        response = await axios.post(
          `${API_URL}/password/confirm-otp`,
          formData,
        );
        if (response.status === 200) {
          success("OTP verified successfully", "You can now log in.");
          navigate("/reset-password");
        }
      } else {
        console.log("otp: " + code);
        if (otpExpired && Date.now() > Number(otpExpired)) {
          failed("Error", "OTP has expired.");
          localStorage.removeItem("email");
          localStorage.removeItem("storeId");
          localStorage.removeItem("otpExpiry");
          return;
        }
        const formData = {
          email: email,
          otp: code,
        };
        console.log("formData: ", formData);
        response = await axios.post(`${API_URL}/users/verify-otp`, formData, {
          withCredentials: true,
        });
        if (response.status === 201) {
          success("OTP verified successfully", "You can now log in.");
          navigate("/register");
          localStorage.removeItem("email");
          localStorage.removeItem("otpExpiry");
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      failed("Error", "Failed to verify OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
      const formData = {
        email: localStorage.getItem("email"),
      };
      const response = await axios.post(
        `${API_URL}/users/resend-otp`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        success("OTP resent successfully", "Check your email.");
        console.log("Resend OTP response:", response.data);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Enter the 6-digit code sent to your email/phone number.
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    className="w-10 h-12 border-2 rounded-xl text-center text-xl font-semibold focus:border-blue-500 outline-none transition-all"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium transition-all"
              >
                Verify
              </button>

              <p className="mt-4 text-sm text-gray-600">
                Didn't receive a code?{" "}
                <button
                  onClick={handleResend}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
