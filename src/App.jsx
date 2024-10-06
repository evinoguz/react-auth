import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";

function App() {
  const { open, data } = useSelector((state) => state.modal);
  return (
    <>
      <Toaster position="top-right"/>
      {open && <Modal name={open} data={data} />}
      <div className="max-w-2xl mx-auto py-5 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
