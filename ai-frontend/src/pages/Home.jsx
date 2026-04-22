import { useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const res = await api.post("/generate-image", {
  prompt: prompt
});
    setImage(res.data.data.imageUrl);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">

      <h1 className="text-5xl font-bold mb-6 text-center">
        Generate AI Images ✨
      </h1>

      <div className="glass p-6 w-full max-w-xl">
        <input
          className="input-ai mb-4"
          placeholder="Enter your imagination..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={generateImage} className="btn-glow w-full">
          Generate
        </button>
      </div>


      <div className="flex justify-center">
        {loading ? (
          <Loader />
        ) : (
          image && (
            <img
              src={image}
              alt="Generated"
              className="rounded-xl shadow-lg w-96"
            />
          )
        )}
      </div>

    </div>
  );
}