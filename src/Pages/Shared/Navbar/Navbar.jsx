import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate()
   const{role} =useRole()
   console.log(role);
  const handelLogOut = () => {
    signOutUser().catch((error) => console.log(error));
  };

  const linkStyle = ({ isActive }) =>
    `font-bold md:text-lg transition ${
      isActive ? "text-[#FAB12F]" : "text-white hover:text-[#FAB12F]"
    }`;


    const handleRole = () => {

        if (role === "admin") {
            navigate("/dashboard/admin-analysis")
        }
        if (role === "user") {
            navigate("/dashboard/booking-history")
        }
        if (role === "decorator") {
            navigate("/dashboard/my-assign-project")
        }
    }

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/service" className={linkStyle}>Services</NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkStyle}>About</NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={linkStyle}>Contact</NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={linkStyle}>Coverage</NavLink>
      </li>

      {user && (
        <li>
         <button onClick={handleRole} className="font-bold md:text-lg text-white hover:text-[#FAB12F]">
           
            Dashboard
         
         </button>
        </li>
      )}
    </>
  );
     
  return (
    <div className="fixed top-0 left-0 w-full z-[500]">
      {/* Transparent / Glassmorphism Navbar */}
      <div className="bg-[#005461] backdrop-blur-xl border-b border-white/20 shadow-sm">
        <Container>
          <div className="navbar">
            {/* Mobile Menu */}
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden -mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white/90 backdrop-blur-xl rounded-box w-52"
                >
                  {links}
                </ul>
              </div>

              <Link
                to="/"
                className="md:text-3xl text-lg text-[#3e71f1] font-bold"
              >
                Spark <span className="text-[#FAB12F] md:text-2xl text-lg">Decore</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* User / Login */}
            <div className="navbar-end">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 h-10 rounded-full border-2 border-white">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || ""}
                        alt="User Avatar"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white/90 backdrop-blur-xl rounded-box z-50 mt-3 w-52 p-2 shadow"
                  >
                    <div className="pb-3 border-b border-gray-300">
                      <li className="text-sm font-bold">{user?.displayName}</li>
                      <li className="text-xs">{user?.email}</li>
                    </div>

                    <li>
                      <button
                        
                        onClick={handleRole} 
                        className="flex items-center gap-1 font-semibold mt-2 mb-3 text-base"
                      >
                        <TbLayoutDashboardFilled size={20}/> DashBoard
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={handelLogOut}
                        className="flex gap-1 items-center md:px-10 px-4 md:py-2 py-1 rounded-xl bg-[#005461] text-white font-bold"
                      >
                        <IoLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex gap-1 items-center md:px-10 px-4 md:py-2 py-1 rounded-xl bg-linearz-to-r from-pink-500 to-red-500 text-white font-bold"
                >
                  <IoLogIn /> Log In
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
