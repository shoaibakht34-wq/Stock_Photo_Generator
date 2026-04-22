import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    liked: 0,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

    
      const statsRes = await api.get("/dashboard");

      setStats({
        total: statsRes.data.data.totalImages,
        liked: statsRes.data.data.likedImages,
      });

  
      const imgRes = await api.get("/my-images?page=0&size=6");

      setImages(imgRes.data.data.content);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 text-white min-h-screen">

      
      <h1 className="text-3xl font-bold mb-6">
        📊 Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="glass p-6 text-center">
          <h2 className="text-gray-400">Total Images</h2>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="glass p-6 text-center">
          <h2 className="text-gray-400">Liked Images</h2>
          <p className="text-4xl font-bold mt-2">{stats.liked}</p>
        </div>

        <div className="glass p-6 text-center">
          <h2 className="text-gray-400">Generations</h2>
          <p className="text-4xl font-bold mt-2">{stats.total}</p>
        </div>

      </div>

      
      <h2 className="text-2xl mb-4">🖼 Recent Creations</h2>

      {images.length === 0 ? (
        <p className="text-gray-400">No images generated yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {images.map((img) => (
            <div
              key={img.id}
              className="glass overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={img.imageUrl}
                alt="AI"
                className="w-full h-48 object-cover"
              />

              <div className="p-3">
                <p className="text-sm text-gray-400 truncate">
                  {img.prompt}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}