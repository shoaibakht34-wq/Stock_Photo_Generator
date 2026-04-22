import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-6xl">404</h1>
      <p className="mb-4">Page not found</p>

      <Link to="/" className="btn-glow">
        Go Home
      </Link>
    </div>
  );
}