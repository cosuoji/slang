import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import useMeta from "../hooks/useMeta";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

    useMeta({
    title: `LambaWiki – Sign up`,
    description: `Sign up for LambaWiki, add a slang, vote a slang, help us build the biggest Slang Library`
  });


  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password !== confirm) return setMsg("Passwords do not match");
    if (!strongRegex.test(password))
      return setMsg(
        "Password must be 8+ chars and include upper/lowercase, number & symbol"
      );

    try {
      const { data } = await api.post("/auth/signup", {
        username,
        email,
        password,
      });
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <form onSubmit={handleSignup} className="w-full space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
      {msg && <p className="text-red-600 text-sm mt-3">{msg}</p>}
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
