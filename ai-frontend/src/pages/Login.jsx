import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });

   const login = async () => {
  try {
    const res = await api.post("/auth/login", data);
    //console.log("LOGIN RESPONSE:", res.data);
    localStorage.setItem("token", res.data.data);

    toast.success("Login Successful");
    window.location.href = "/";
  } catch (err) {
    toast.error("Invalid credentials");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="glass p-8 w-96">
        <h2 className="text-2xl mb-4">Login</h2>

        <input
          className="input-ai mb-3"
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          type="password"
          className="input-ai mb-4"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={login} className="btn-glow w-full">
          Login
        </button>
        <p className="mt-4 text-sm text-center">
  Don't have an account?{" "}
  <Link to="/register" className="text-purple-400 hover:underline">
    Register
  </Link>
</p>
      </div>
    </div>
  );
}