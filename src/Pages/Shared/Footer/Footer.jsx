// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Container from "../../../Component/Container/Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 relative overflow-hidden">
      <Container>
        {/* Decorative top wave */}
        <div className="absolute top-0 left-0 w-full">
          <svg viewBox="0 0 1440 80" className="w-full h-20">
            <path
              fill="#111827"
              d="M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,42.7C840,21,960,11,1080,16C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {/* Logo & Tagline */}
          <div className="">
            <h1 className="text-3xl font-bold text-yellow-400 tracking-widest">
              Spark<span className="text-white text-2xl">Decore</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-base leading-relaxed">
              We specialize in transforming your events into unforgettable memories. From smart home decorations
              to grand ceremony setups, our solutions combine elegance, innovation, and precision to make
              every celebration truly remarkable.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-30">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Booking</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Gallery</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Stay Connected</h2>
            <p className="text-gray-400 text-lg md:text-base leading-relaxed">
              Subscribe to get updates, decoration tips, and the latest trends delivered straight to your inbox.
            </p>
            <div className="mt-4 flex">
              <div className="join w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered join-item w-full bg-white text-gray-800 focus:outline-none"
                />
                <button className="btn join-item bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mt-6 text-gray-400 space-y-1">
              <p>📍 123 Event Street, Dhaka, Bangladesh</p>
              <p>📞 +880 1234 567 890</p>
              <p>✉ info@shrinkdecore.com</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm py-6 border-t border-gray-800 relative z-10">
          &copy; {new Date().getFullYear()} SparkDecore. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
