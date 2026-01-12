import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import useRole from "../../../hooks/useRole";
import { useTheme } from "../../../Contexts/ThemeContext";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate()
  const {theme, toggleTheme} = useTheme()
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);
  // const handleTheme = (checked) => {
  //   setTheme(checked ? "dark" : "light");
  // };
   const{role} =useRole()
   console.log(role);
  const handelLogOut = () => {
    signOutUser().catch((error) => console.log(error));
  };

  const linkStyle = ({ isActive }) =>
    `font-bold md:text-lg transition ${
      isActive ? "text-[#FAB12F] dark:text-amber-400" : "text-white hover:text-[#FAB12F] dark:hover:text-amber-400"
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
         <button onClick={handleRole} className="font-bold md:text-lg text-white hover:text-[#FAB12F] dark:hover:text-amber-400">
           
            Dashboard
         
         </button>
        </li>
      )}
    </>
  );
     
  return (
    <div className="fixed top-0 left-0 w-full z-[500]">
      {/* Transparent / Glassmorphism Navbar */}
      <div className="bg-[#005461] dark:bg-gray-900 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-sm">
        <Container>
          <div className="navbar">
            {/* Mobile Menu */}
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden -mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white -ml-4"
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
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#005461] dark:bg-gray-800 backdrop-blur-xl rounded-box w-52"
                >
                  {links}
                </ul>
              </div>

              <Link
                to="/"
                className="md:text-3xl text-lg text-white font-bold"
              >
                Spark <span className="text-[#FAB12F] dark:text-amber-400 md:text-2xl text-lg">Decore</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            

            {/* User / Login */}
            <div className="navbar-end flex items-center gap-3">
            
              <label className="swap swap-rotate">
              
                <input
                  onChange={(e) => toggleTheme(e.target.checked)}
                  checked={theme === "dark"}
                  type="checkbox" 
                  className="theme-controller" 
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-7 w-7 md:h-8 md:w-8 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-7 w-7 md:h-8 md:w-8 fill-current text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              {user ? (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-300">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || ""}
                        alt="User Avatar"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-box z-50 mt-3 w-52 p-2 shadow"
                  >
                    <div className="pb-3 border-b border-gray-300 dark:border-gray-600">
                      <li className="text-sm font-bold dark:text-gray-100">{user?.displayName}</li>
                      <li className="text-xs dark:text-gray-300">{user?.email}</li>
                    </div>

                    <li>
                      <button
                        
                        onClick={handleRole} 
                        className="flex items-center gap-1 font-semibold mt-2 mb-3 text-base dark:text-gray-100"
                      >
                        <TbLayoutDashboardFilled size={20}/> DashBoard
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={handelLogOut}
                        className="flex gap-1 items-center md:px-10 px-4 md:py-2 py-1 rounded-xl bg-[#005461] dark:bg-teal-600 text-white font-bold"
                      >
                        <IoLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex gap-1 items-center   rounded-xl text-white font-bold"
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