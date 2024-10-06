import React, { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useSelector } from "react-redux";
import { setUserData } from "../utils";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    setUserData();
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="grid gap-y-10 mt-5">
      <span className="flex align-items-center font-serif">
        <Link to={"/"}>{"< Geri"}</Link>
      </span>
      {/* Profil Güncelleme */}
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-2">Profili Güncelle</h1>
        <div>
          {avatar && (
            <img src={avatar} className="w-20 h-20 rounded-full mb-5" />
          )}
          <label className="block text-sm font-medium text-gray-700">Ad</label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
              placeholder="Ad giriniz..."
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profil Resmi
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-20"
          >
            Güncelle
          </button>
        </div>
      </form>
      {/* Şifre Güncelleme */}
      <form onSubmit={handleResetPasswordSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Parola Güncelle</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
              value={password}
              placeholder="Yeni Parola"
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
            Parola Güncelle
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
