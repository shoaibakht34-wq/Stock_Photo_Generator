import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center">

        {/* LEFT SECTION */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">AI Image Studio</h2>
          <p className="text-sm opacity-80 mt-2">
            Generate stunning AI images instantly
          </p>
        </div>

        {/* CENTER COPYRIGHT */}
        <div className="mt-6 md:mt-0 text-sm opacity-80">
          © {new Date().getFullYear()} AI Image Studio. All rights reserved.
        </div>

        {/* RIGHT SOCIAL ICONS */}
        <div className="flex gap-4 mt-6 md:mt-0 text-lg">
          
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-gray-200 transition"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-gray-200 transition"
          >
            <FaTwitter />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-gray-200 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-gray-200 transition"
          >
            <FaLinkedinIn />
          </a>

        </div>
      </div>
    </footer>
  );
}