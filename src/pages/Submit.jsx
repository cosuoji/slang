import { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import useMeta from "../hooks/useMeta";


export default function Submit() {
  const { token } = useContext(AuthContext);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const [msg, setMsg] = useState("");

  useMeta({
    title: "LambaWiki – Add a new slang",
    description: "Add a new slang to our ever expanding glossary"
  });

  const submit = async () => {
    try {
      await api.post("/slangs", { word, meaning, example });
      setMsg("Submitted for review!");
      setWord(""); setMeaning(""); setExample("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  if (!token) return <p className="p-6 text-center">Login to submit slang</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Submit New Slang</h1>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Slang word"
        value={word}
        onChange={e=>setWord(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Meaning"
        value={meaning}
        onChange={e=>setMeaning(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Example sentence (optional)"
        value={example}
        onChange={e=>setExample(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Submit
      </button>
      <p className="mt-3 text-sm">{msg}</p>
    </div>
  );
}
// import useMeta from "../hooks/useMeta";

// export default function Glossary() {
//   useMeta({
//     title: "Naija Slang Glossary – Browse by Letter",
//     description: "Discover Nigerian slang alphabetically. Submit and vote!"
//   });

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Glossary</h1>
//       {/* page content */}
//     </div>
//   );
// }