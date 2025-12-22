// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Container from "../../../Component/Container/Container";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 relative overflow-hidden">
      <Container>
        {/* Decorative top wave */}
       

        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
          {/* Logo & Tagline */}
          <div className="">
            <h1 className="text-3xl font-bold text-white tracking-widest">
              Spark <span className="text-[#FAB12F] text-2xl">Decore</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-base leading-relaxed mt-4">
              We specialize in transforming your events into unforgettable memories. From smart home decorations
              to grand ceremony setups, our solutions combine elegance, innovation, and precision to make
              every celebration truly remarkable.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to='https://www.facebook.com/shahedulhoquee/' className="hover:text-[#FAB12F] transition"><FaFacebookF  size={25} /></Link>
              <Link to='https://www.instagram.com/sh.shahedul/' className="hover:text-[#FAB12F] transition"><FaInstagram  size={25}/></Link>
              <Link to='https://x.com/sh_shahedul' className="hover:text-[#FAB12F] transition"><FaTwitter size={25} /></Link>
              <Link to='https://www.linkedin.com/in/sh-shahedul/' className="hover:text-[#FAB12F] transition"><FaLinkedinIn size={25} /></Link>
             </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-30">
            <h2 className="text-xl font-semibold mb-4 text-[#FAB12F]">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to='/' className="hover:text-[#FAB12F] transition">Home</Link></li>
              <li><Link to='/service' className="hover:text-[#FAB12F] transition">Services</Link></li>
              <li><Link to='/about' className="hover:text-[#FAB12F] transition">About</Link></li>
              <li><Link to='/coverage' className="hover:text-[#FAB12F] transition">Coverage</Link></li>
              <li><Link to='/contact' className="hover:text-[#FAB12F] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#FAB12F]">Stay Connected</h2>
            <p className=" text-lg md:text-base leading-relaxed">
              Subscribe to get updates, decoration tips, and the latest trends delivered straight to your inbox.
            </p>
            <div className="mt-4 flex">
              <div className="join w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered join-item w-full bg-white text-gray-800 focus:outline-none"
                />
                <button className="btn join-item bg-[#FAB12F] text-gray-900 hover:bg-[#FAB12F] font-bold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mt-6  space-y-1">
              <p>📍 123 Event Street, Dhaka, Bangladesh</p>
              <p>📞 +880 1234 567 890</p>
              <p>✉ info@shrinkdecore.com</p>
            </div>
          </div>
        </div>

        <div className="text-center  py-6 border-t border-gray-800 relative z-10">
          &copy; {new Date().getFullYear()} <span className="text-[#FAB12F]">SparkDecore.</span> All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
