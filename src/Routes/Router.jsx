import { createBrowserRouter } from "react-router";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home/Home";



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
]);