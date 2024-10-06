import React, { useState } from "react";
const LoginForm = ({ handleSubmit, noEmail = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handle = (e) => {
    handleSubmit(e, email, password);
  };

  return (
    <div>
      <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handle}>
        {!noEmail && (
          <div>
            <h1 className="text-indigo-700 font-bold text-2xl text-center m-5">
              SignIn
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
        )}

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
            disabled={!password}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-20"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
