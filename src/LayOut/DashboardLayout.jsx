import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaChartArea, FaCircleUser } from "react-icons/fa6";
import Container from '../Component/Container/Container';
import { IoHomeSharp } from "react-icons/io5";
import { MdAssignmentReturned, MdHistoryEdu, MdLibraryAdd, MdManageAccounts } from 'react-icons/md';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { RiCalendarScheduleFill, RiMoneyEuroBoxFill } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

import { FaExternalLinkAlt } from 'react-icons/fa';
import useRole from '../hooks/useRole';
import { HiViewBoards } from 'react-icons/hi';
import Loading from '../Component/Loading/Loading';
import { PiToolboxFill } from 'react-icons/pi';

const DashboardLayout = () => {
  const {role, roleLoading} = useRole()
  if(roleLoading) return <Loading></Loading>
    return (
        <Container>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
  <div className="drawer-content ">
    {/* Navbar */}
    <nav  className="navbar w-full bg-[#005461]">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="cursor-pointer">
        {/* Sidebar toggle icon */}
         
         <HiViewBoards size={25} className=' text-[#FAB12F]'/>
      </label>
      <div className="px-4 text-white text-4xl font-bold">Spark <span className='text-2xl text-[#FAB12F]'>Decore</span></div>
    </nav>
    {/* Page content here */}
    <Outlet></Outlet>
    
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-[#005461] is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        {/* List item */}
        <li>
          <NavLink to='/'className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Home page">
            {/* Home icon */}
           <IoHomeSharp size={25} />
            <span className="is-drawer-close:hidden">Homepage</span>
          </NavLink>
        </li>
         {/* admin route  */}
        
         {
          role === "admin" &&   <>
           <li>

          <NavLink to='/dashboard/admin-analysis' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Admin Analysis ">         
          
           <FaChartArea size={25} />
            <span className="is-drawer-close:hidden">Admin Analysis</span>
          </NavLink>
        </li> 
          
         <li>
          <NavLink
              to='/dashboard/add-service'
                className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white'}`}data-tip="Add Service">
              {/* <BsHouseAddFill size={25} /> */}
              <MdLibraryAdd size={25}/>
             <span className="is-drawer-close:hidden">Add Service</span>
        </NavLink>
         </li>
        
         <li>
          <NavLink to='/dashboard/manage-service' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white'}` } data-tip="Manage Service">         
           {/* <FaBuffer size={25} /> */}
           <PiToolboxFill size={25} />
          
            <span className="is-drawer-close:hidden">Manage Service </span>
          </NavLink>
        </li> 
         <li>
          <NavLink to='/dashboard/manage-users' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Manage Decorator">         
           <MdManageAccounts size={25} />
            <span className="is-drawer-close:hidden">Manage Decorator </span>
          </NavLink>
        </li> 
         <li>
          <NavLink to='/dashboard/manage-booking' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Manage Booking ">         
          
            <TiEdit size={25} />
            <span className="is-drawer-close:hidden">Manage Booking </span>
          </NavLink>
        </li>        

         

                
          </>
         }

        
        {/* decorator  role */}
          {
            role ==='decorator' && <>
                      <li>
          <NavLink to='/dashboard/my-assign-project' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white'}` } data-tip="My Assign Project">         
           <MdAssignmentReturned size={25} />
            <span className="is-drawer-close:hidden">My Assign Project </span>
          </NavLink>
          </li>
          <li>
          <NavLink to='/dashboard/update-project' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Update Project Status">         
          
           <FaExternalLinkAlt size={20} />
            <span className="is-drawer-close:hidden">Update Project Status </span>
          </NavLink>
          </li>

          <li>
          <NavLink to='/dashboard/today-schedule' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Today's Schedule">         
            <RiCalendarScheduleFill size={25} />
            <span className="is-drawer-close:hidden">Today's Schedule</span>
          </NavLink>
          </li> 
          <li>
          <NavLink to='/dashboard/earning-summary' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Earning Summary">         
           <RiMoneyEuroBoxFill size={25} />
            <span className="is-drawer-close:hidden">Earning Summary</span>
          </NavLink>
          </li> 

            
            </>
          }

        {/* user role */}
        {
          role === 'user' && <>
          
             <li>
          <NavLink to='/dashboard/booking-history' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Booking History">
            
            <MdHistoryEdu size={25} />
            <span className="is-drawer-close:hidden">Booking History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/payment-history' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="Payment History">
            
            <BsCreditCard2BackFill size={25} />
            <span className="is-drawer-close:hidden">Payment History</span>
          </NavLink>
        </li>
          
          </>
        }
       
        <li>
          <NavLink to='/dashboard/profile' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-[#FAB12F]' : 'text-white' }` } data-tip="My Profile">
           
            <FaCircleUser size={25} />
            <span className="is-drawer-close:hidden">My Profile</span>
          </NavLink>
        </li>
        
      </ul>
    </div>
  </div>
        </div>
        </Container>
    );
};

export default DashboardLayout;