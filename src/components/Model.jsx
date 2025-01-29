import React, { useState } from "react";
import { Link } from "react-router-dom";

const Modal = ({ title, fields, buttonText, onSubmit, toggleText, toggleAction }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className=" pt-20 flex items-center justify-center bg-opacity-40 z-50">
      <div className="bg-white h-[450px] overflow-hidden p-6 rounded-2xl shadow-lg w-[370px] relative">
        <div className="absolute -top-2 left-4 z-20 border rounded-full w-16 h-16 bg-gradient-to-r from-purple-200 to-purple-400"></div>
        <div className="absolute top-0 z-40 -left-5 w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"></div>

        <div>
          <div className="flex w-full justify-center items-center py-6 font-medium">
            <h2 className="text-xl">{title}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={index}>
                  <label className="text-sm text-gray-500">{field.label}</label>
                  <div className="border h-7 rounded">
                    <input
                      type={field.type}
                      name={field.name}
                      onChange={handleChange}
                      className="outline-none w-full px-3 text-xs"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center py-4">
              <button
                type="submit"
                className="flex cursor-pointer text-xs justify-center items-center border rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900"
              >
                {buttonText}
              </button>
            </div>

            <div className="text-center">
              <p>
                {toggleText}{" "}
                <span className="text-purple-600 cursor-pointer" onClick={toggleAction}>
                  {buttonText === "Login" ? "Register" : "Login"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
