import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Admin() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchPending = async () => {
    try {
      const { data } = await api.get("/admin/slangs/pending");
      setPending(data);
    } catch (err) {
      console.error(err);
      setMsg("Failed to load pending slangs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approve = async (id) => {
    try {
      await api.patch(`/admin/slangs/${id}/approve`);
      setPending((prev) => prev.filter((s) => s._id !== id));
      setMsg("✅ Slang approved!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error approving slang");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this slang?")) return;
    try {
      await api.delete(`/admin/slangs/${id}`);
      setPending((prev) => prev.filter((s) => s._id !== id));
      setMsg("🗑️ Slang deleted");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error deleting slang");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading pending slangs…</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Manager</h1>

      {msg && (
        <p className="mb-4 bg-gray-100 text-center text-sm py-2 rounded">{msg}</p>
      )}

      {pending.length === 0 ? (
        <p className="text-center text-gray-600">No pending slangs 🎉</p>
      ) : (
        pending.map((s) => (
          <div key={s._id} className="border p-4 mb-3 rounded shadow-sm">
            <h2 className="font-semibold text-lg">{s.word}</h2>
            <p className="text-gray-700 mb-2">{s.meaning}</p>
            {s.example && (
              <p className="italic text-gray-600 mb-2">“{s.example}”</p>
            )}
            <div className="flex space-x-3">
              <button
                onClick={() => approve(s._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => remove(s._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
