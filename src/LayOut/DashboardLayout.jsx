import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaCircleUser } from "react-icons/fa6";
import Container from '../Component/Container/Container';
import { CiTextAlignJustify } from "react-icons/ci";
import { IoHomeSharp } from "react-icons/io5";
import { MdAssignmentReturned, MdHistoryEdu, MdManageAccounts } from 'react-icons/md';
import { BsCreditCard2BackFill, BsHouseAddFill } from 'react-icons/bs';
import { RiCalendarScheduleFill, RiMoneyEuroBoxFill } from "react-icons/ri";
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { FaBuffer } from 'react-icons/fa';
// import AssignDecorator from '../Pages/Dashboard/Admin/AssignDecorator/AssignDecorator';
const DashboardLayout = () => {
//  const axiosSecure = useAxiosSecure()
 const{user}= useAuth()
 const decoratorEmail = user?.email;
//   const {data:users=[]} = useQuery({
//     queryKey: ['users', user?.email],
//     queryFn: async ()=> {
//       const res = await axiosSecure.get(`/users/email?email=${user?.email}`)
//        return res.data
//     }
//   })

  // console.log(users);
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
         {/* admin  */}
        {/* 
         {
          users.role === "admin" &&   <> */}
          
         <li>
          <NavLink
              to='/dashboard/add-service'
                className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : ''}`}data-tip="Add Service">
              <BsHouseAddFill size={25} />
             <span className="is-drawer-close:hidden">Add Service</span>
        </NavLink>
         </li>
        
         <li>
          <NavLink to='/dashboard/manage-service' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Manage Service">         
           <FaBuffer size={25} />
            <span className="is-drawer-close:hidden">Manage Service </span>
          </NavLink>
        </li> 
         <li>
          <NavLink to='/dashboard/manage-users' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Manage Service">         
           <MdManageAccounts size={25} />
            <span className="is-drawer-close:hidden">Manage users </span>
          </NavLink>
        </li> 
         <li>
          <NavLink to='/dashboard/manage-booking' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Manage Booking ">         
           <MdManageAccounts size={25} />
            <span className="is-drawer-close:hidden">Manage Booking </span>
          </NavLink>
        </li> 
         



         <li>

          <NavLink to='/dashboard/manage-decorator' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Manage Decorator ">         
           <MdManageAccounts size={25} />
            <span className="is-drawer-close:hidden">Manage Decorator </span>
          </NavLink>
        </li> 
                
          {/* </>
         } */}

        
        {/* decorator  */}

          <li>
          <NavLink to='/dashboard/my-assign-project' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="My Assign Project">         
           <MdAssignmentReturned size={25} decoratorEmail={decoratorEmail} />
            <span className="is-drawer-close:hidden">My Assign Project </span>
          </NavLink>
          </li>

          <li>
          <NavLink to='/dashboard/today-schedule' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Today's Schedule">         
            <RiCalendarScheduleFill size={25} />
            <span className="is-drawer-close:hidden">Today's Schedule</span>
          </NavLink>
          </li> 
          <li>
          <NavLink to='/dashboard/earning-summary' className={({ isActive }) =>`is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2 ${isActive ? 'text-pink-500' : '' }` } data-tip="Earning Summary">         
           <RiMoneyEuroBoxFill size={25} />
            <span className="is-drawer-close:hidden">Earning Summary</span>
          </NavLink>
          </li> 










        {/* List item */}
        <li>
          <NavLink to='/dashboard/booking-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2" data-tip="Booking History">
            
            <MdHistoryEdu size={25} />
            <span className="is-drawer-close:hidden">Booking History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/dashboard/payment-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right -ml-1 mt-2" data-tip="Payment History">
            
            <BsCreditCard2BackFill size={25} />
            <span className="is-drawer-close:hidden">Payment History</span>
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