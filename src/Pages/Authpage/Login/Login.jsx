// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import { PiEyeFill } from "react-icons/pi";
// import { TbEyeClosed } from "react-icons/tb";
// import loginIllustration from "../../../assets/log-in.png"; 
// import Container from "../../../Component/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import SocialLogin from "../SocialLogin/SocialLogin";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPass, setShowPass] = useState(false);
//   const { signInUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handelLogIn = (data) => {
//     signInUser(data.email, data.password)
//       .then(result => {
//         console.log(result.user)
//         navigate(location.state || '/');
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <div>
//       <Container>
//         <Link to='/' className="text-3xl font-bold mt-10" style={{ color: "#FFD93D" }}>
//           Spark <span className="text-white text-2xl">Decore</span>
//         </Link>

//         <div className="flex flex-col lg:flex-row min-h-screen">
//           {/* Left side form */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 bg-white">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFD93D" }}>Login</h1>
//             <p className="text-gray-600 mb-6 text-sm md:text-base">Login to Spark Decore</p>

//             <form onSubmit={handleSubmit(handelLogIn)} className="w-full max-w-sm space-y-4">
//               {/* Email */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   {...register('email', { required: true })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   placeholder="Enter your email"
//                 />
//                 {errors.email && <p className="text-red-600 text-sm mt-1">Email is required</p>}
//               </div>

//               {/* Password */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPass ? "text" : "password"}
//                     {...register('password', { required: true, minLength: 6 })}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
//                     placeholder="Enter your password"
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
//                   >
//                     {showPass ? <TbEyeClosed /> : <PiEyeFill />}
//                   </span>
//                 </div>
//                 {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is required</p>}
//                 {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
//               </div>

//               {/* Forgot Password */}
//               <div className="text-right mb-4">
//                 <Link to="/forgot-password" className="text-yellow-600 text-sm underline">Forgot Password?</Link>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-2 rounded"
//               >
//                 Login
//               </button>

//               {/* Register Link */}
//               <p className="mt-4 text-gray-600 text-sm text-center">
//                 Don't have an account? <Link to="/register" className="text-yellow-600 font-semibold">Register</Link>
//               </p>
//             </form>

//             {/* Social Login */}
//             <div className="w-full max-w-sm mt-4">
//               <SocialLogin />
//             </div>
//           </div>

//           {/* Right side illustration */}
//           <div className="w-full lg:w-1/2 bg-yellow-50 flex justify-center items-center p-6 md:p-10">
//             <img
//               src={loginIllustration}
//               alt="Illustration"
//               className="max-w-full md:max-w-sm"
//             />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import { PiEyeFill } from "react-icons/pi";
// import { TbEyeClosed } from "react-icons/tb";
// import loginIllustration from "../../../assets/log-in.png";
// import Container from "../../../Component/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import SocialLogin from "../SocialLogin/SocialLogin";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPass, setShowPass] = useState(false);
//   const { signInUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handelLogIn = (data) => {
//     signInUser(data.email, data.password)
//       .then(() => navigate(location.state || "/"))
//       .catch(err => console.log(err));
//   };

//   return (
//     <Container>
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
//             <p className="text-gray-500 mb-6">
//               Login to Spark Decore
//             </p>

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
//                     {...register("password", { required: true, minLength: 6 })}
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
//                   <p className="text-red-500 text-sm">Password is required</p>
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

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-[#005461] hover:bg-[#00404A] text-white font-semibold py-2 rounded-lg transition"
//               >
//                 Login
//               </button>

//               {/* Register */}
//               <p className="text-sm text-center">
//                 Don’t have an account?{" "}
//                 <Link to="/register" className="text-[#FAB12F] font-semibold">
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
      // .then(() => )
      .catch((err) => {
        console.log(err);
        setLoginError("Invalid email or password");
      });
  };

  return (
    <Container>
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold mt-10 text-[#005461]">
        Spark <span className="text-[#FAB12F] text-2xl">Decore</span>
      </Link>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Form */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-white">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-[#005461] mb-1">
              Login
            </h1>
            <p className="text-gray-500 mb-6">Login to Spark Decore</p>

            <form onSubmit={handleSubmit(handelLogIn)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showPass ? <TbEyeClosed /> : <PiEyeFill />}
                  </span>
                </div>

                {errors.password?.type === "required" && (
                  <p className="text-red-500 text-sm">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-sm">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Forgot */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#005461] underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/*  Login Error Message */}
              {loginError && (
                <p className="text-red-500 text-sm text-center">
                  {loginError}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#005461] hover:bg-[#00404A] cursor-pointer text-white font-semibold py-2 rounded-lg transition"
              >
                Login
              </button>

              {/* Register */}
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#FAB12F] font-semibold"
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
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#F3FAFA] p-6">
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

