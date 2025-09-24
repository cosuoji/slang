import { useState } from "react";
import api from "../utils/api";

export default function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg("⚠️ All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/feedback", form);
      setMsg("✅ Thanks for your feedback!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">💡 Share Your Ideas / Leave Feedback</h1>
      {msg && <p className="mb-3 text-center text-sm text-gray-700">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="message"
          placeholder="Your Feedback or Idea..."
          value={form.message}
          onChange={handleChange}
          rows="4"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
