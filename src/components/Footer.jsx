export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
      {/* Social + Email */}
      <div className="flex justify-center space-x-6 mb-3">
        <a
          href="https://x.com/lambawiki"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors"
        >
          X (Twitter)
        </a>
        <a
          href="https://instagram.com/lambawiki"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-300 transition-colors"
        >
          Instagram
        </a>
        <a
          href="mailto:lambawiki@proton.me"
          className="hover:text-yellow-300 transition-colors"
        >
          lambawiki@proton.me
        </a>
      </div>

      {/* Copyright */}
      <div>
        <p className="text-sm">
          © {new Date().getFullYear()} LambaWiki — Naija Slang Dictionary
        </p>
      </div>
    </footer>
  );
}
