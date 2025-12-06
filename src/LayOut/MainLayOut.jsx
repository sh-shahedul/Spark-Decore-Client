import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const MainLayOut = () => {
    return (
      
     <div className=' flex flex-col max-w-screen-2xl mx-auto min-h-screen '>
             <Navbar></Navbar>
           <div className='flex-1'>
            <Outlet></Outlet>
            </div> 
            <Footer></Footer>
     </div>
      
    );
};

export default MainLayOut;