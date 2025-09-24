import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo-bg.png"

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/">
      <img src={logo} className="h-20">
      </img>
      </Link>
      <div className="flex space-x-4">
        <Link to="/glossary" className="hover:text-yellow-300">Glossary</Link>
        <Link to="/submit" className="hover:text-yellow-300">Submit</Link>
        <Link to="/feedback" className="hover:text-yellow-300">Feedback</Link>
        {user?.role === "admin" && <Link to="/admin" className="hover:text-yellow-300">Admin</Link>}
        {user ? (
          <button
            onClick={logout}
            className="hover:text-yellow-300"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        )}
      </div>
    </nav>
  );
}
