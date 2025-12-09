import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authpage/Login/Login";
import Register from "../Pages/Authpage/Register/Register";
import Coverage from "../Pages/Covergae/Coverage";
import AllService from "../Pages/AllService/AllService";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../LayOut/DashboardLayout";
import Profile from "../Pages/Profile/Profile";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import BookingHistory from "../Pages/Dashboard/BookingHistory/BookingHistory";
import Payment from "../Pages/Dashboard/Payment/Payment";






export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayOut,
    children: [
        {
            index:true,
            Component:Home

        },
        {
          path:'coverage',
          Component:Coverage,
          loader:()=>fetch('/serviceCenter.json').then(res=>res.json())
        },
        {
          path:'about',
          Component:About
        },
        {
          path:'contact',
          Component:Contact,
        },
        {
          path:'service',
          Component:AllService,
        },
        {
          path:'services/:id',
          Component:ServiceDetails,
        },
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children: [
      {
        path:'/login',
        Component:Login,
      },
      {
        path:'/register',
        Component:Register,
      },
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path:'booking-history',
        Component:BookingHistory
     
      },
      {
        path:'payment/:bookingId',
        Component:Payment
     
      },
       {
          path:'profile',
          Component:Profile,
        },
    ]
  }
]);