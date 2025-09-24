import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // lightweight icons
import logo from "../assets/logo-bg.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        to="/glossary"
        className="block px-3 py-2 hover:text-yellow-300"
        onClick={() => setOpen(false)}
      >
        Glossary
      </Link>
      <Link
        to="/submit"
        className="block px-3 py-2 hover:text-yellow-300"
        onClick={() => setOpen(false)}
      >
        Submit
      </Link>
      <Link
        to="/feedback"
        className="block px-3 py-2 hover:text-yellow-300"
        onClick={() => setOpen(false)}
      >
        Feedback
      </Link>
      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="block px-3 py-2 hover:text-yellow-300"
          onClick={() => setOpen(false)}
        >
          Admin
        </Link>
      )}
      {user ? (
        <button
          onClick={() => {
            logout();
            setOpen(false);
          }}
          className="block w-full text-left px-3 py-2 hover:text-yellow-300"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="block px-3 py-2 hover:text-yellow-300"
          onClick={() => setOpen(false)}
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-14" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">{navLinks}</div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-2 bg-gray-700 rounded shadow-lg">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
