import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaCircleUser } from "react-icons/fa6";
import Container from '../Component/Container/Container';
import { CiTextAlignJustify } from "react-icons/ci";
import { IoHomeSharp } from "react-icons/io5";
import { MdHistoryEdu } from 'react-icons/md';
const DashboardLayout = () => {
    return (
        <Container>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav  className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
         <CiTextAlignJustify size={25} className=' text-pink-600'/>
      </label>
      <div className="px-4 text-pink-600 text-4xl font-bold">Spark <span className='text-2xl text-black'>Decore</span></div>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
    
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <NavLink to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 -ml-1" data-tip="Homepage">
            {/* Home icon */}
           <IoHomeSharp size={25} />
            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>

        {/* List item */}
        <li>
          <NavLink to='/dashboard/booking-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2" data-tip="profile">
            
            <MdHistoryEdu size={25} />
            <span className="is-drawer-close:hidden">Booking History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2" data-tip="profile">
           
            <FaCircleUser size={25} />
            <span className="is-drawer-close:hidden">My Profile</span>
          </NavLink>
        </li>
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
        </div>
        </Container>
    );
};

export default DashboardLayout;