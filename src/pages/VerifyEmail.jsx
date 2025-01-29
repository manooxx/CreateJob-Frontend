import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../utils/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/companyDashboard"), 4000);
      } catch (err) {
        setMessage(err.message || "Invalid or expired verification link.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold">{message}</h2>
      handleLogin
    </div>
  );
};

export default VerifyEmail;
