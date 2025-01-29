import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Model";
import { registerCompany, loginCompany } from "../utils/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsLogin((prev) => !prev);
    setError(null);
  };

  const handleSubmit = async (formData) => {
    try {
    //   console.log("Submitting form data:", formData);
      setError(null);
      if (isLogin) {
        const data = await loginCompany(formData);
        // console.log("Login response:", data);
        alert("Login successful!");
        navigate("/companyDashboard");
      } else {
        const response = await registerCompany(formData);
        // console.log("Registration response:", response);
        alert("Registration successful! Check your email for verification.");
        navigate("/verify-email");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Something went wrong!");
    }
  };
  
  

  return (
    <div>
      <Modal
        title={isLogin ? "Login Form" : "Register Form"}
        fields={
          isLogin
            ? [
                { label: "Email", name: "email", type: "text" },
                { label: "Password", name: "password", type: "password" },
              ]
            : [
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "text" },
                { label: "Password", name: "password", type: "password" },
                { label: "Phone", name: "phone", type: "number" },
              ]
        }
        buttonText={isLogin ? "Login" : "Register"}
        onSubmit={handleSubmit}
        toggleText={isLogin ? "Don't have an account?" : "Already have an account!"}
        toggleAction={toggleAuth}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Auth;
