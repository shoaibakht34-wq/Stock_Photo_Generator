import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/auth/register", data);
      alert("Registered successfully 🚀");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
      <div className="glass p-8 w-96">
        <h2 className="text-2xl mb-4 text-center">Create Account</h2>

        <input
          className="input-ai mb-3 w-full"
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          className="input-ai mb-3 w-full"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="input-ai mb-4 w-full"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={register} className="btn-glow w-full">
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}