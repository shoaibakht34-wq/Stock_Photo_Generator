import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route
  path="/gallery"
  element={
    <ProtectedRoute>
      <Gallery />
    </ProtectedRoute>
  }
/>
<Route path="/dashboard" element={<Dashboard />} />
<Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}