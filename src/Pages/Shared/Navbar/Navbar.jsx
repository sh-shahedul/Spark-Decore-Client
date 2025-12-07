import React from "react";
import { Link, NavLink } from "react-router";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";
import { FaCartPlus, FaDownload, FaUser } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handelLogOut = () => {
    signOutUser()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink className="font-bold md:text-lg text-black hover:text-purple-300">Home</NavLink>
      </li>
      <li>
        <NavLink to='/service' className="font-bold md:text-lg text-black hover:text-purple-300">Services</NavLink>
      </li>
      <li>
        <NavLink to='/about' className="font-bold md:text-lg text-black hover:text-purple-300">About</NavLink>
      </li>
      <li>
        <NavLink to='/contact' className="font-bold md:text-lg text-black hover:text-purple-300">Contact</NavLink>
      </li>
      <li>
        <NavLink to='/coverage' className="font-bold md:text-lg  text-black hover:text-purple-300">Coverage</NavLink>
      </li>
     

      {
        user && <>
            <li>
                <NavLink className="font-bold md:text-lg text-black hover:text-purple-300">Dashboard</NavLink>
            </li>
        </>
      }
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-500">
      <div className="bg-white/10 backdrop-blur-md">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              {/* Mobile Menu */}
              <div className="dropdown ">
                <label tabIndex={0} className="btn btn-ghost lg:hidden -mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-purple-900 rounded-box w-52"
                >
                  {links}
                </ul>
              </div>

              <Link to="/" className=" md:text-3xl text-lg text-pink-600 font-bold">
                Spark <span className="text-black md:text-2xl text-lg">Decore</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            <div className="navbar-end">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img 
                      referrerPolicy="no-referrer"
                      src={user.photoURL || ""} alt="User Avatar" />
                    </div>
                  </label>

                  <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li>
                <Link to="/dashboard/dashboard"  className={`flex items-center gap-1 font-semibold mb-3 mt-2 }`}>
                  <TbLayoutDashboardFilled /> DashBoard
                </Link>
              </li>
                

              <li>
                <button
                  onClick={handelLogOut}
                  className="flex gap-1 items-center md:px-10 px-4 md:py-2 py-1 rounded-2xl bg-linear-to-r from-pink-500 to-red-500 text-white  font-bold  hover:from-pink-400 hover:via-red-500 hover:to-pink-500"
                >
                  <IoLogOut/> Logout
                </button>
              </li>
            </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex gap-1 items-center md:px-10 px-4 md:py-2 py-1 rounded-2xl bg-linear-to-r from-pink-500 to-red-500 text-white  font-bold  hover:from-pink-400 hover:via-red-500 hover:to-pink-500"
                >
                  <IoLogIn/> Log In
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




//  {user ? (
//           <div className="dropdown dropdown-end z-50">
//             {/* Avatar Button */}
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-12 border-2 border-gray-300 hover:border-pink-600 rounded-full">
//                {user.photoURL && (
//                 <img
//                     alt="User Avatar"
//                   referrerPolicy="no-referrer"
//                   src={user.photoURL}
//                   className="rounded-full w-10 h-10"
//                 />
//               )}
//               </div>
//             </div>

//             {/* Dropdown Menu */}
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
//             >
//               <div className="pb-3 border-b border-gray-200">
//                 <li className="text-sm font-bold">{user.displayName}</li>
//                 <li className="text-xs">{user.email}</li>
//               </div>

//               <li className="mt-3">
//                 <Link href="/profile"  className={`flex items-center gap-1 ${linkClass("/profile")}`}>
//                   <FaUser /> Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/addBooks"  className={`flex items-center gap-1 ${linkClass("/addBooks")}`}>
//                   <FaCartPlus /> Add Books
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/myBooks"  className={`flex items-center gap-1 ${linkClass("/myBooks")}`}>
//                   <FaDownload /> My Books
//                 </Link>
//               </li>
             

//               <li>
//                 <button
//                   onClick={handelLogOut}
//                   className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
//                 >
//                   <IoLogOut /> Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <Link
//             href="/login"
//             className="btn rounded-full border-gray-300 btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white flex items-center gap-1"
//           >
//             <IoLogIn /> Login
//           </Link>
//         )}