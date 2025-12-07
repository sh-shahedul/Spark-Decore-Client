import React from "react";
import { Link, NavLink } from "react-router";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";

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
        <NavLink className="font-bold md:text-lg text-black hover:text-purple-300">Services</NavLink>
      </li>
      <li>
        <NavLink className="font-bold md:text-lg text-black hover:text-purple-300">About</NavLink>
      </li>
      <li>
        <NavLink className="font-bold md:text-lg text-black hover:text-purple-300">Contact</NavLink>
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

              <Link to="/" className=" md:text-3xl text-lg text-yellow-400 font-bold">
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
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-yellow-400 rounded-box w-52"
                  >
                    <li>
                      <button
                        onClick={handelLogOut}
                        className="font-bold text-white hover:text-yellow-400"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="md:px-10 px-4 md:py-2 py-1 rounded-2xl bg-yellow-400 text-black font-bold hover:bg-transparent hover:border-2 hover:text-yellow-400 hover:border-yellow-400"
                >
                  Log In
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
