import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, emailVerification, addTodo, deleteTodo } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { modalOpen } from "../utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
dayjs.extend(relativeTime);
dayjs.locale("tr");

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { todos } = useSelector((state) => state.todos);
  const [todo, setTodo] = useState("");
  const [done, setDone] = useState(false);
  const [animationParent] = useAutoAnimate({ duration: 300 });

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  const handleVerification = async () => {
    await emailVerification();
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      uid: user.uid,
      done,
    });
    setTodo("");
    setDone(false);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };

  if (user) {
    return (
      <div>
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL ? (
            <img src={user.photoURL} className="w-20 h-20 rounded-full" />
          ) : (
            <img
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
              }
              className="w-20 h-20 rounded-full"
            />
          )}
          <div className="w-2 h-2 bg-green-800 rounded-full" />
          Aktif - {user.displayName} ({user.email})
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
            >
              E-mail Onayla
            </button>
          )}
          <Link
            to={"/settings"}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700 flex items-center"
          >
            Ayarlar
          </Link>
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-sm text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
        </h1>
        <div>
          <form onSubmit={submitHandle} className="flex gap-x-4 mt-5">
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              placeholder="Todo yaz"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
            />
            <label className="flex gap-x-2 items-center">
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
            </label>
            <button
              type="submit"
              disabled={!todo}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-20"
            >
              Ekle
            </button>
          </form>
          <ul ref={animationParent} className="mt-5 flex flex-col gap-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 rounded font-mono bg-indigo-50 text-indigo-700"
              >
                <div className="flex justify-between">
                  <span className={`${todo.done ? "line-through" : ""} pr-5`}>
                    {todo.todo}
                  </span>
                  <div className="flex gap-x-2">
                    <button
                      onClick={() => modalOpen("edit-todo-modal", todo)}
                      className="h-7 rounded px-3 text-xs bg-green-700 hover:bg-green-900 text-white"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="h-7 rounded px-3 text-xs bg-red-700 hover:bg-red-900 text-white"
                    >
                      Sil
                    </button>
                  </div>
                </div>
                <div className="flex justify-between pb-1 pt-4 text-sm">
                  {todo.done ? (
                    <span className="text-green-900">Tamamlandı</span>
                  ) : (
                    <span className="text-red-900">Tamamlanmadı</span>
                  )}
                  {todo.createdAt && (
                    <span className="fst-italic font-sans">
                      {dayjs.unix(todo.createdAt.seconds).fromNow()}
                    </span>
                  )}
                </div>
              </li>
            ))}
            {todos.length === 0 && (
              <li className="p-4 rounded bg-orange-50 text-sm text-orange-700 text-center">
                Liste boş...
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-slate-100">
      <ul className="flex justify-end align-items-center px-5 py-2 gap-4 font-serif">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/register"}>Sign Up</Link>
        </li>
        <li>
          <Link to={"/login"}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
