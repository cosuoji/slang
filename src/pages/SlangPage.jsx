// src/pages/SlangPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import useMeta from "../hooks/useMeta";
import { FaTwitter, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";

export default function SlangPage() {
  const { slug } = useParams();
  const [slang, setSlang] = useState(null);
  const [msg, setMsg] = useState("");
  const [copyMsg, setCopyMsg] = useState("");

  useMeta({
    title: `LambaWiki – ${slang?.word}`,
    description: `${slang?.meaning}`,
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

  const handleCopy = async () => {
    const shareUrl = `${window.location.origin}/slangs/${slang.slug}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopyMsg("🔗 Link copied!");
    setTimeout(() => setCopyMsg(""), 2000);
  };

  if (!slang) return <p className="p-6 text-center">Loading...</p>;

  // Share info
  const shareUrl = `${window.location.origin}/slangs/${slang.slug}`;
  const shareText = `Check out this Naija slang: "${slang.word}" – ${slang.meaning}`;

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
          Submitted by{" "}
          <span className="font-semibold">{slang.contributor.username}</span>
        </p>
      )}

      {/* Voting */}
      <div className="flex justify-center space-x-6 mb-6">
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

      {/* Social Share */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">
          Share this slang
        </h3>
        <div className="flex justify-center space-x-4">
          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          >
            <FaTwitter size={20} />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              shareText + " " + shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
          >
            <FaWhatsapp size={20} />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full"
          >
            <FaFacebook size={20} />
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full"
          >
            <FaLink size={20} />
          </button>
        </div>
        {copyMsg && (
          <p className="text-center mt-2 text-sm text-green-600">{copyMsg}</p>
        )}
      </div>

      {msg && (
        <p className="text-center text-sm text-gray-600 bg-gray-100 py-2 mt-4 rounded">
          {msg}
        </p>
      )}
    </div>
  );
}
