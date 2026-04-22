import { useState } from "react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-purple-600 px-3 py-1 rounded-full"
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 rounded-lg shadow-lg">
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-800">
            Dashboard
          </button>
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}