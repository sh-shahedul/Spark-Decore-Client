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
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AddService from "../Pages/Dashboard/Admin/AddService/AddService";
import ManageService from "../Pages/Dashboard/Admin/ManageService/ManageService";
import UpdateService from "../Pages/Dashboard/Admin/UpdateService/UpdateService";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import MyAssignProject from "../Pages/Dashboard/Decorator/MyAssignProject/MyAssignProject";
import TodaySchedule from "../Pages/Dashboard/Decorator/TodayShedule/TodaySchedule";
import EarningSummary from "../Pages/Dashboard/Decorator/EarningSummary/EarningSummary";
import ManageDecorater from "../Pages/Dashboard/Admin/ManageDecorator/ManageDecorater";
import ManageBooking from "../Pages/Dashboard/Admin/ManageBooking/ManageBooking";
import ReportAnalisis from "../Pages/Dashboard/Admin/ReportAnalysis/ReportAnalisis";
import UpdateProjectStatus from "../Pages/Dashboard/Decorator/UpdateProjectStatus/UpdateProjectStatus";







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
        path:'payment-success',
        Component: PaymentSuccess
        
     
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancelled

     
      },
      {
        path:'payment-history',
        Component: PaymentHistory

     
      },
       {
          path:'profile',
          Component:Profile,
        },
       {
          path:'add-service',
          Component:AddService,
        },
       {
          path:'manage-service',
          Component: ManageService,
        },
       {
          path:'update-service',
          Component: UpdateService,
        },
       {
          path:'manage-users',
          Component: ManageUsers,
        },
       {
          path:'my-assign-project',
          Component: MyAssignProject,
        },
       {
          path:'today-schedule',
          Component: TodaySchedule,
        },
       {
          path:'earning-summary',
          Component: EarningSummary,
        },
       {
          path:'manage-decorator',
          Component: ManageDecorater,
        },
       {
          path:'manage-booking',
          Component: ManageBooking,
        },
       {
          path:'report-analysis',
          Component: ReportAnalisis,
        },
       {
          path:'update-project',
          Component: UpdateProjectStatus,
        },
      
    ]
  }
]);