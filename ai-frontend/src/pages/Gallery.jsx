import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await api.get("/my-images");
      setImages(res.data.data.content);
    } catch (err) {
      toast.error("Failed to load images");
    }
  };

  
  const deleteImage = async (id) => {
    try {
      await api.delete(`/delete-image/${id}`);
      setImages(images.filter((img) => img.id !== id));
      toast.success("Image deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  
  const likeImage = async (id) => {
    try {
      const res = await api.put(`/like-image/${id}`);

      setImages(
        images.map((img) =>
          img.id === id ? res.data.data : img
        )
      );
    } catch {
      toast.error("Like failed");
    }
  };

  
  const searchImages = async () => {
    try {
      const res = await api.get(`/search-images?keyword=${search}`);
      setImages(res.data.data.content);
    } catch {
      toast.error("Search failed");
    }
  };

  
  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-image.png";
    link.click();
  };

  return (
    <div className="p-6">

      
      <div className="flex gap-2 mb-6">
        <input
          className="input-ai"
          placeholder="Search prompt..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchImages} className="btn-glow">
          Search
        </button>
      </div>

      
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="mb-4 break-inside-avoid relative group">

            <img
              src={img.imageUrl}
              className="rounded-xl hover:scale-105 transition"
            />

            {/* 🔥 HOVER ACTIONS */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">

              <button
                onClick={() => likeImage(img.id)}
                className="bg-black/70 p-2 rounded"
              >
                {img.liked ? "❤️" : "🤍"}
              </button>

              <button
                onClick={() => downloadImage(img.imageUrl)}
                className="bg-black/70 p-2 rounded"
              >
                ⬇
              </button>

              <button
                onClick={() => deleteImage(img.id)}
                className="bg-black/70 p-2 rounded"
              >
                🗑
              </button>

            </div>

            <p className="text-sm text-gray-400 mt-1">
              {img.prompt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}