import { useState } from "react";
import axios from "axios";

export default function YouTubeAnalysis() {
  const [videoId, setVideoId] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!videoId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:4000/api/youtube-analysis?video_id=${videoId}`);
      setData(res.data);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] p-8 text-gray-800 dark:text-white">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 card-shadow rounded-2xl p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-brand-purple dark:text-brand-purple-light">
          YouTube Video Analysis
        </h2>

        <input
          type="text"
          placeholder="Enter YouTube Video ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-purple"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-2 px-4 rounded-xl font-semibold text-white bg-brand-purple dark:bg-brand-purple-light hover:bg-brand-purple-dark dark:hover:bg-brand-purple transition duration-200"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {data && (
          <div className="bg-brand-purple/10 dark:bg-brand-purple/20 border border-brand-purple/30 dark:border-brand-purple-light/30 p-4 rounded-xl space-y-2">
            <p><span className="font-semibold">🎬 Title:</span> {data.title}</p>
            <p><span className="font-semibold">👁️ Views:</span> {data.views}</p>
            <p><span className="font-semibold">👍 Likes:</span> {data.likes}</p>
            <p><span className="font-semibold">🔁 Shares:</span> {data.shares || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

