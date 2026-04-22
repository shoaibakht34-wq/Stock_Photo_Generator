import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${token}`;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md border-b border-gray-800">

      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
        <span className="text-purple-500 text-2xl">⚡</span>
        AI Image Studio
      </Link>

      <div className="flex gap-6 items-center text-gray-300">

        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/gallery" className="hover:text-white">Gallery</Link>
        <Link to="/about" className="hover:text-white">About</Link>
        <Link to="/chat" className="hover:text-white">Chat</Link>
        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>

        {!token ? (
          <>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link
              to="/register"
              className="bg-purple-600 px-4 py-1 rounded-lg hover:bg-purple-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full border border-gray-600"
            />

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/gallery"
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  🖼 My Images
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600"
                >
                  🚪 Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}