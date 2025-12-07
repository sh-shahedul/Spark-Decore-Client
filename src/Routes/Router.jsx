import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authpage/Login/Login";
import Register from "../Pages/Authpage/Register/Register";
import Coverage from "../Pages/Covergae/Coverage";
// import Profile from "../Pages/Profile/Profile";
import AllService from "../Pages/AllService/AllService";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../LayOut/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";




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
        path:'dashboard',
        Component:Dashboard
     
      },
       {
          path:'profile',
          Component:Profile,
        },
    ]
  }
]);