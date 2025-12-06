import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
  ];

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Wave SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,0V46.29c47.09,22,98.47,29,148.8,18.52C234.28,50.16,282,31,332.21,27.66c70.66-4.92,134.31,27,203.45,35.44,95.47,12.39,184.56-15.38,275.19-40.15,84.82-23.12,165.46-18.91,248.37,10.31V0Z"
            className="fill-gradient-to-r from-purple-600 via-pink-500 to-yellow-400"
          ></path>
        </svg>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 text-base-200 px-6 pt-20 pb-10 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Brand & About */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Book MY Decore</h2>
            <p className="text-gray-300 text-sm">
              Smart booking for home & ceremony decoration services. Explore packages, check availability, and enjoy hassle-free setups.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="btn btn-warning text-black mt-3"
            >
              Book Now
            </motion.button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2 text-sm">
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{
                    scale: 1.3,
                    rotate: 10,
                    color: "#fbbf24",
                  }}
                  className="text-gray-300 transition-all duration-300 text-xl"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <div className="text-sm">
              <h3 className="text-white font-semibold mb-1">Working Hours</h3>
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p>Sat: 10:00 AM - 4:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 text-center py-4 text-xs text-gray-400 mt-10">
          © {new Date().getFullYear()} Book MY Decore. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

