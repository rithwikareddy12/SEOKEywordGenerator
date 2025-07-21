import { useState } from "react";
import axios from "axios";

const SearchVolume = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<{ volume: number; competition: string; video_count: number } | null>(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/search-volume?keyword=${keyword}`);
      setResult(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        className="input input-bordered w-full"
      />
      <button onClick={handleSearch} className="btn btn-primary w-full">
        Analyze
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded shadow-md">
          <p><strong>Search Volume:</strong> {result.volume}</p>
          <p><strong>Competition:</strong> {result.competition}</p>
          <p><strong>YouTube Video Count:</strong> {result.video_count}</p>
        </div>
      )}
    </div>
  );
};

export default SearchVolume;
