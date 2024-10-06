import React, { useState } from "react";
import { login } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <>
      <span className="flex align-items-center font-serif">
        <Link to={"/"}>{"< Geri"}</Link>
      </span>
      <LoginForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Login;
