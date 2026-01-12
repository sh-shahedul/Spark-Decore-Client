// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import { PiEyeFill } from "react-icons/pi";
// import { TbEyeClosed } from "react-icons/tb";
// import loginIllustration from "../../../assets/log-in.png";
// import Container from "../../../Component/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import toast from "react-hot-toast";


// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [showPass, setShowPass] = useState(false);
//   const [loginError, setLoginError] = useState(""); 

//   const { signInUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handelLogIn = (data) => {
//       setLoginError("");
//     signInUser(data.email, data.password)
//        .then(()=>{
//         toast.success(" 🎉 Login Successfull")
//          navigate(location.state || "/")
//        })
//       // .then(() => )
//       .catch((err) => {
//         console.log(err);
//         setLoginError("Invalid email or password");
//       });
//   };

//   return (
//     <Container>
//       <title>spark decore | Login</title>
//       {/* Logo */}
//       <Link to="/" className="text-3xl font-bold mt-10 text-[#005461]">
//         Spark <span className="text-[#FAB12F] text-2xl">Decore</span>
//       </Link>

//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left Form */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-white">
//           <div className="w-full max-w-sm">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#005461] mb-1">
//               Login
//             </h1>
//             <p className="text-gray-500 mb-6">Login to Spark Decore</p>

//             <form onSubmit={handleSubmit(handelLogIn)} className="space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="font-medium">Email</label>
//                 <input
//                   type="email"
//                   {...register("email", { required: true })}
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">Email is required</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="font-medium">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPass ? "text" : "password"}
//                     {...register("password", {
//                       required: true,
//                       minLength: 6,
//                     })}
//                     className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
//                     placeholder="Enter your password"
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-3 top-3 cursor-pointer text-gray-600"
//                   >
//                     {showPass ? <TbEyeClosed /> : <PiEyeFill />}
//                   </span>
//                 </div>

//                 {errors.password?.type === "required" && (
//                   <p className="text-red-500 text-sm">
//                     Password is required
//                   </p>
//                 )}
//                 {errors.password?.type === "minLength" && (
//                   <p className="text-red-500 text-sm">
//                     Password must be at least 6 characters
//                   </p>
//                 )}
//               </div>

//               {/* Forgot */}
//               <div className="text-right">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-[#005461] underline"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/*  Login Error Message */}
//               {loginError && (
//                 <p className="text-red-500 text-sm text-center">
//                   {loginError}
//                 </p>
//               )}

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#005461] hover:bg-[#00404A] cursor-pointer text-white font-semibold py-2 rounded-lg transition"
//               >
//                 Login
//               </button>

//               {/* Register */}
//               <p className="text-sm text-center">
//                 Don’t have an account?{" "}
//                 <Link
//                   to="/register"
//                   className="text-[#FAB12F] font-semibold"
//                 >
//                   Register
//                 </Link>
//               </p>
//             </form>

//             {/* Social */}
//             <div className="mt-4">
//               <SocialLogin />
//             </div>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#F3FAFA] p-6">
//           <img
//             src={loginIllustration}
//             alt="Login Illustration"
//             className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { PiEyeFill } from "react-icons/pi";
import { TbEyeClosed } from "react-icons/tb";
import loginIllustration from "../../../assets/log-in.png";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import toast from "react-hot-toast";


const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(""); 

  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handelLogIn = (data) => {
      setLoginError("");
    signInUser(data.email, data.password)
       .then(()=>{
        toast.success(" 🎉 Login Successfull")
         navigate(location.state || "/")
       })
      
      .catch((err) => {
        console.log(err);
        setLoginError("Invalid email or password");
      });
  };
   const DemoCredential = {
   admin:{
         email : "sabbirrahman@mail.com",
        password: "1234aA!"
       },
   decorator:{
         email : "shuvo@gmail.com",
        password: "1234aA!"
       },
   user:{
         email : "habib@gmail.com",
        password: "1234aA!"
       },
   }

  const handelCredential = (e)=>{
     const role = e.target.value
     if(!DemoCredential[role]) return;
     
     setValue("email", DemoCredential[role].email)
     setValue("password", DemoCredential[role].password)
  }


  return (
    <Container>
      <title>spark decore | Login</title>
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold mt-10 text-[#005461] dark:text-teal-400">
        Spark <span className="text-[#FAB12F] dark:text-amber-400 text-2xl">Decore</span>
      </Link>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-white dark:bg-gray-800">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-[#005461] dark:text-teal-400 mb-1">
              Login
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Login to Spark Decore</p>

            <form onSubmit={handleSubmit(handelLogIn)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="font-medium dark:text-gray-200">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full p-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FAB12F] dark:focus:ring-amber-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="font-medium dark:text-gray-200">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className="w-full p-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FAB12F] dark:focus:ring-amber-400 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600 dark:text-gray-300"
                  >
                    {showPass ? <TbEyeClosed /> : <PiEyeFill />}
                  </span>
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-500 dark:text-red-400 text-sm">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 dark:text-red-400 text-sm">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Forgot and demo creadintial */}
  <div className="flex  items-center justify-between">
   <select
   onChange={handelCredential}
  defaultValue="Demo Credential?"
  className="bg-transparent border-none shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus:bg-transparent p-2 h-auto min-h-0 text-sm underline cursor-pointer appearance-none text-[#005461] dark:text-teal-400">
  <option disabled>Demo Credential?</option>
  <option className="font-semibold" value={"admin"}>Admin</option>
  <option className="font-semibold" value={"decorator"}>Decorator</option>
  <option className="font-semibold" value={"user"}>User</option>
  </select>

                <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#005461] dark:text-teal-400 underline"
                >
                  Forgot Password?
                </Link>
              </div>
              </div>

              {/*  Login Error Message */}
              {loginError && (
                <p className="text-red-500 dark:text-red-400 text-sm text-center">
                  {loginError}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#005461] dark:bg-teal-600 hover:bg-[#00404A] dark:hover:bg-teal-700 cursor-pointer text-white font-semibold py-2 rounded-lg transition"
              >
                Login
              </button>

              {/* Register */}
              <p className="text-sm text-center dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#FAB12F] dark:text-amber-400 font-semibold"
                >
                  Register
                </Link>
              </p>
            </form>

            {/* Social */}
            <div className="mt-4">
              <SocialLogin />
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#F3FAFA] dark:bg-gray-900 p-6">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;