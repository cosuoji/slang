// src/pages/SlangPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import useMeta from "../hooks/useMeta";


export default function SlangPage() {
  const { slug } = useParams();
  const [slang, setSlang] = useState(null);
  const [msg, setMsg] = useState("");

  useMeta({
    title: `LambaWiki – ${slang?.word}`,
    description: `${slang?.meaning}`
  });


  
  useEffect(() => {
    const fetchSlang = async () => {
      try {
        const { data } = await api.get(`/slangs/slug/${slug}`);
        setSlang(data);
      } catch {
        setMsg("Unable to load slang details");
      }
    };

    fetchSlang();
  }, [slug]);

  const vote = async (type) => {
    try {
      const { data } = await api.patch(`/slangs/${slang._id}/vote`, { vote: type });
      setSlang(data);
      setMsg(type === "up" ? "✅ Upvoted!" : "👎 Downvoted!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error voting");
    }
  };

  if (!slang) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-lg pt-10 mx-auto p-6 rounded shadow-sm bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Slang:</h2>
        <p className="text-lg">{slang.word}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Definition:</h2>
        <p className="text-gray-700">{slang.meaning}</p>
      </div>

      {slang.example && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Example:</h2>
          <p className="italic text-gray-600">“{slang.example}”</p>
        </div>
      )}

      {slang.contributor?.username && (
        <p className="mb-6 text-sm text-gray-500">
          Submitted by <span className="font-semibold">{slang.contributor.username}</span>
        </p>
      )}

      <div className="flex justify-center space-x-6 mb-4">
        <button
          onClick={() => vote("up")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
        >
          👍 Upvote ({slang.upvotes})
        </button>
        <button
          onClick={() => vote("down")}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow"
        >
          👎 Downvote ({slang.downvotes})
        </button>
      </div>

      {msg && (
        <p className="text-center text-sm text-gray-600 bg-gray-100 py-2 rounded">
          {msg}
        </p>
      )}
    </div>
  );
}
