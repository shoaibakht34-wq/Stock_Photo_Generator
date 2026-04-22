import {
  FaRobot,
  FaImage,
  FaDatabase,
  FaLock,
  FaGithub,
  FaGlobe,
  FaCloud,
  FaBolt
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">

      <div className="text-center mb-20 animate-fadeIn">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Build Stunning Images with{" "}
          <span className="text-purple-400">AI Power</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          AI Image Studio lets you transform simple text into high-quality AI-generated
          images using a powerful full-stack architecture. Fast, secure, and built for creators.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">


        <div className="animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">
            🚀 What is AI Image Studio?
          </h2>

          <p className="text-gray-400 leading-relaxed">
            AI Image Studio is a full-stack AI application that allows users to generate
            images from text prompts using advanced AI models. It integrates a modern
            React frontend with a secure Spring Boot backend and cloud storage via Supabase.
            <br /><br />
            The goal is simple — make AI image generation accessible, fast, and user-friendly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slideUp">

          <div className="glass p-6 text-center">
            <FaBolt className="text-purple-400 text-2xl mx-auto mb-2" />
            <h3 className="text-xl font-bold">Fast Generation</h3>
            <p className="text-gray-400 text-sm">AI-powered real-time image creation</p>
          </div>

          <div className="glass p-6 text-center">
            <FaCloud className="text-blue-400 text-2xl mx-auto mb-2" />
            <h3 className="text-xl font-bold">Cloud Storage</h3>
            <p className="text-gray-400 text-sm">Images stored securely in Supabase</p>
          </div>

          <div className="glass p-6 text-center">
            <FaLock className="text-red-400 text-2xl mx-auto mb-2" />
            <h3 className="text-xl font-bold">Secure Auth</h3>
            <p className="text-gray-400 text-sm">JWT-based authentication system</p>
          </div>

        </div>

    
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg space-y-8 animate-slideUp">

          <div className="flex gap-4 items-start hover:scale-105 transition">
            <FaRobot className="text-purple-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">AI Image Generation</h3>
              <p className="text-gray-400">
                Generate unique high-quality images using HuggingFace AI models from simple text prompts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:scale-105 transition">
            <FaImage className="text-blue-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Personal Gallery</h3>
              <p className="text-gray-400">
                Every generated image is saved and can be accessed anytime from your gallery.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:scale-105 transition">
            <FaDatabase className="text-green-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Robust Backend</h3>
              <p className="text-gray-400">
                Built with Spring Boot REST APIs handling authentication, storage, and user data.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:scale-105 transition">
            <FaCloud className="text-cyan-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Supabase Integration</h3>
              <p className="text-gray-400">
                Images are uploaded and served via Supabase cloud storage for scalability.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start hover:scale-105 transition">
            <FaLock className="text-red-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">JWT Security</h3>
              <p className="text-gray-400">
                Secure login and API protection using token-based authentication.
              </p>
            </div>
          </div>

        </div>
        <div className="animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">
            ⚙️ How It Works
          </h2>

          <p className="text-gray-400 leading-relaxed">
            1. User enters a prompt in the frontend  
            <br />
            2. Request is sent to Spring Boot backend  
            <br />
            3. Backend calls AI model (HuggingFace API)  
            <br />
            4. Image is generated and uploaded to Supabase  
            <br />
            5. Image URL is saved in database and returned  
          </p>
        </div>

        <div className="animate-slideUp">
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">
            🧠 Tech Stack
          </h2>

          <div className="flex flex-wrap gap-4">
            {[
              "Spring Boot",
              "JWT Security",
              "React + Vite",
              "Tailwind CSS",
              "Supabase",
              "PostgreSQL",
              "HuggingFace API"
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm hover:bg-purple-500/20 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-slideUp">
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">
            🌐 Connect With Me
          </h2>

          <div className="flex flex-wrap gap-6">

            <a
              href="https://github.com/shoaibakht34-wq"
              target="_blank"
              className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
            >
              <FaGithub /> GitHub
            </a>

            <div className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-lg opacity-60 cursor-not-allowed">
              <FaGlobe /> Portfolio (Coming Soon)
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}