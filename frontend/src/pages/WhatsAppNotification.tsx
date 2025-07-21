import { useState } from "react";
import axios from "axios";

export default function WhatsAppNotification() {
  const [videoId, setVideoId] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/api/whatsapp-track", {
        video_id: videoId,
        phone_number: phone,
      });
      setMessage("✅ Tracking started successfully!");
      setStatus("success");
    } catch (err) {
      setMessage("❌ Failed to start tracking.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] p-8 text-gray-800 dark:text-white flex items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 card-shadow rounded-2xl p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-brand-purple dark:text-brand-purple-light">
          WhatsApp Notifications
        </h2>

        <input
          type="text"
          placeholder="YouTube Video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purple"
        />

        <input
          type="text"
          placeholder="WhatsApp Number (+91...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purple"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 rounded-xl font-semibold text-white bg-brand-purple dark:bg-brand-purple-light hover:bg-brand-purple-dark dark:hover:bg-brand-purple transition duration-200"
        >
          Start Tracking
        </button>

        {message && (
          <p
            className={`text-center font-medium p-2 rounded-xl ${
              status === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
