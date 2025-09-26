import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useMeta from "../hooks/useMeta";

export default function Home() {
  const [slang, setSlang] = useState(null);        // 🔑 Slang of the Day
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchRandom(); }, []);

  const fetchRandom = async () => {
    const { data } = await api.get("/slangs/random");
    setSlang(data);
  };

  const search = async () => {
    if (!query.trim()) return;
    const { data } = await api.get(`/slangs?search=${encodeURIComponent(query)}`);
    setResults(data);
  };

  // ✅ Submit search with Enter / Return
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  useMeta({
      title: `LambaWiki `,
      description: `Welcome to the home of the biggest slang database in Nigeria, login, signup and help us build`
    });
  

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Search Our Glossary of Lamba
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex mb-4">
        <input
          className="border flex-1 p-2"
          placeholder="Search slang..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white px-4 ml-2 rounded"
          onClick={search}
        >
          Go
        </button>
        {results.length > 0 && (
          <button
            className="ml-2 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={clearSearch}
          >
            ✕
          </button>
        )}
      </div>

      {/* 🔎 Search Results */}
      {results.length > 0 && (
        <div className="mb-8">
          {results.map((r) => (
            <div
              key={r._id}
              onClick={() => navigate(`/slang/${r.slug || r._id}`)}
              className="border p-3 mb-2 rounded cursor-pointer hover:bg-gray-100 transition"
            >
              <strong>{r.word}</strong> – {r.meaning}
            </div>
          ))}
        </div>
      )}

      {/* 🌟 Slang of the Day – Always Visible */}
      {slang && (
        <div
          className="border p-5 rounded shadow-sm bg-white hover:bg-gray-50 cursor-pointer transition"
          onClick={() => navigate(`/slang/${slang.slug}`)}
        >
          <h2 className="text-xl font-bold mb-2">✨ Slang of the Day</h2>
          <p>
            <strong>{slang.word}</strong>: {slang.meaning}
          </p>
          {slang.example && (
            <p className="italic mt-2">“{slang.example}”</p>
          )}
        </div>
      )}
    </div>
  );
}
