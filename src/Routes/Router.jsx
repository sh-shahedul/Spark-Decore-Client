import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout";
import Login from "../Pages/Authpage/Login/Login";
import Register from "../Pages/Authpage/Register/Register";




export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayOut,
    children: [
        {
            index:true,
            Component:Home

        }
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
  }
]);