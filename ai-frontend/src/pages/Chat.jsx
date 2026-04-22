import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");

    try {
      setLoading(true);

      const res = await api.get(`/ask-ai?prompt=${prompt}`);

      const aiMsg = {
        role: "ai",
        text: res.data.data
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch {
      toast.error("AI failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-black text-white">

      
      <div className="p-4 border-b border-gray-800 text-lg font-semibold">
        🤖 AI Assistant
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 rounded-2xl max-w-xl shadow-lg ${
                msg.role === "user"
                  ? "bg-purple-600"
                  : "bg-gray-800 border border-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 animate-pulse">
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

    
      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 outline-none"
          placeholder="Ask anything..."
        />

        <button
          onClick={sendMessage}
          className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}