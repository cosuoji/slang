import { useEffect, useState } from "react";
import api from "../utils/api";
import useMeta from "../hooks/useMeta";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [selected, setSelected] = useState("");
  const [slangs, setSlangs] = useState([]);

  useEffect(() => {
    if (selected) fetchByAlpha(selected);
  }, [selected]);

  const fetchByAlpha = async (alpha) => {
    const { data } = await api.get(`/slangs?alpha=${alpha}`);
    setSlangs(data);
  };

   useMeta({
      title: `Lamba Wiki – Glossary`,
      description: "Have a slang in mind? Search our Glossary for it, Can't find it? Help us add it"
    });
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Glossary</h1>

      <div className="grid grid-cols-13 sm:grid-cols-13 gap-1 mb-6 text-center">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelected(letter)}
            className={`border rounded p-1 text-sm ${
              selected === letter ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {selected && (
        <>
          <h2 className="text-lg font-semibold mb-3">
            Words starting with “{selected}”
          </h2>
          {slangs.length === 0 && <p>No slang found for this letter.</p>}
          <ul className="space-y-3">
            {slangs?.map((s) => (
              <li key={s._id} className="border p-3 rounded hover:bg-gray-50">
                <a
                  className="font-bold text-blue-600"
                  href={`/slang/${s.slug}`}
                >
                  {s.word}
                </a>{" "}
                – {s.meaning}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
