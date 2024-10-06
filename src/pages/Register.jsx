import React, { useState } from "react";
import { register } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    navigate("/");
  };
  return (
    <div>
      <span className="flex align-items-center font-serif">
        <Link to={"/"}>{"< Geri"}</Link>
      </span>
      <form
        className="max-w-xl mx-auto grid gap-y-4 py-4"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-indigo-700 font-bold text-2xl text-center m-5">
            SignUp
          </h1>
          <label className="block text-sm font-medium text-gray-700">
            E-posta
          </label>
          <div className="mt-1">
            <input
              type="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
              placeholder="Email giriniz..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
              placeholder="Şifre giriniz..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={!email || !password}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-20"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
