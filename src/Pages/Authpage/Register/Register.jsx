// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import { PiEyeFill } from 'react-icons/pi';
// import { TbEyeClosed } from 'react-icons/tb';
// import regieterLogo from "../../../assets/regester.png";
// import Container from "../../../Component/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import axios from "axios";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPass, setShowPass] = useState(false);
//   const [termsChecked, setTermsChecked] = useState(false);
//   const { createUser, updateUserProfile, user, setUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosSecure = useAxiosSecure();

//   const handelRegistration = async (data) => {
//     if (!termsChecked) {
//       alert("You must accept the Terms & Conditions");
//       return;
//     }

//     try {
//       // Create Firebase user
//       const result = await createUser(data.email, data.password);
//       console.log(result.data)
//       const profileImg = data.photo[0];

//       // Upload image to ImgBB
//       const formData = new FormData();
//       formData.append("image", profileImg);
//       const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
//       const imgRes = await axios.post(image_API_URL, formData);
//       const photoURL = imgRes.data.data.url;

//       //  Update Firebase profile
//       await updateUserProfile({ displayName: data.name, photoURL });
//       setUser({ ...user, photoURL });

//       // Add user to backend DB
//       const userInfo = {
//         email: data.email,
//         displayName: data.name,
//         photoURL,
//         role: 'user',
//         createdAt: new Date()
//       };

//       const dbRes = await axiosSecure.post("/users", userInfo);
//       if (dbRes.data.insertedId) console.log("User created in DB successfully");
//       else if (dbRes.data.message === "user exist") console.log("User already exists");

//       // Navigate
//       navigate(location.state || "/");

//     } catch (error) {
//       console.log("Registration Error:", error);
//     }
//   };

//   return (
//     <div>
//       <Container>
//         <Link to="/" className="text-3xl font-bold mt-10" style={{ color: "#FFD93D" }}>
//           Spark <span className="text-white text-2xl">Decore</span>
//         </Link>

//         <div className="flex flex-col lg:flex-row min-h-screen">
//           {/* Left side form */}
//           <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 bg-white">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFD93D" }}>Create an Account</h1>
//             <p className="text-gray-600 mb-6 text-sm md:text-base">Register with Spark Decore</p>

//             <form onSubmit={handleSubmit(handelRegistration)} className="w-full max-w-sm space-y-4">
//               {/* Name */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Name</label>
//                 <input
//                   type="text"
//                   {...register("name", { required: true, minLength: 3 })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                   placeholder="Your Name"
//                 />
//                 {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.type === 'required' ? "Name is Required" : "Name must be at least 3 characters"}</p>}
//               </div>

//               {/* Email */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   {...register("email", { required: true })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
//                   placeholder="Email"
//                 />
//                 {errors.email && <p className="text-red-600 text-sm mt-1">Email is Required</p>}
//               </div>

//               {/* Photo */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Photo</label>
//                 <input
//                   type="file"
//                   {...register("photo", { required: true })}
//                   className="file-input w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
//                 />
//                 {errors.photo && <p className="text-red-600 text-sm mt-1">Photo is Required</p>}
//               </div>

//               {/* Password */}
//               <div className="mb-4">
//                 <label className="block font-medium mb-1">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPass ? "text" : "password"}
//                     {...register("password", {
//                       required: true,
//                       minLength: 6,
//                       pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/
//                     })}
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 pr-10"
//                     placeholder="Password"
//                   />
//                   <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 cursor-pointer text-gray-600">
//                     {showPass ? <TbEyeClosed /> : <PiEyeFill />}
//                   </span>
//                 </div>
//                 {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is Required</p>}
//                 {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
//                 {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm mt-1">Password must contain at least one uppercase, one lowercase, and one special character.</p>}
//               </div>

//               {/* Terms */}
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={termsChecked}
//                   onChange={() => setTermsChecked(!termsChecked)}
//                   className="h-4 w-4 text-yellow-600 border-gray-300 rounded"
//                 />
//                 <label htmlFor="terms" className="text-gray-600 text-sm">
//                   I agree to the <Link to="/terms" className="text-yellow-600 underline">Terms & Conditions</Link>
//                 </label>
//               </div>

//               <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-600 text-black font-semibold py-2 rounded mt-2 disabled:opacity-50" disabled={!termsChecked}>
//                 Register
//               </button>
//             </form>

//             <p className="mt-4 text-gray-600 text-sm">
//               Already have an account? <Link to="/login" className="text-yellow-600 font-semibold">Login</Link>
//             </p>

//             <div className="w-full max-w-sm mt-4">
//               <SocialLogin />
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 bg-yellow-50 flex justify-center items-center p-6 md:p-10">
//             <img src={regieterLogo} alt="Illustration" className="max-w-full md:max-w-sm" />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router";
// import { PiEyeFill } from "react-icons/pi";
// import { TbEyeClosed } from "react-icons/tb";
// import regieterLogo from "../../../assets/regester.png";
// import Container from "../../../Component/Container/Container";
// import useAuth from "../../../hooks/useAuth";
// import SocialLogin from "../SocialLogin/SocialLogin";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import axios from "axios";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPass, setShowPass] = useState(false);
//   const [termsChecked, setTermsChecked] = useState(false);
//   const { createUser, updateUserProfile, user, setUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosSecure = useAxiosSecure();

//   const handelRegistration = async (data) => {
//     if (!termsChecked) return alert("You must accept the Terms & Conditions");

//     try {
//       const result = await createUser(data.email, data.password);
//       console.log(result.user);
//       const profileImg = data.photo[0];
//       console.log(data);
//       const formData = new FormData();
//       formData.append("image", profileImg);
//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
//         formData
//       );
    
//       const photoURL = imgRes.data.data.url;
//        console.log(photoURL)
//       await updateUserProfile({ displayName: data.name, photoURL });
//       setUser({ ...result.user, photoURL ,  
//         email: data.email,
//         displayName: data.name,});


//       await axiosSecure.post("/users", {
//         email: data.email,
//         displayName: data.name,
//         photoURL,
//         role: "user",
//         createdAt: new Date(),
//       });

//       navigate(location.state || "/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container>
//       <Link to="/" className="text-3xl font-bold mt-10 text-[#005461]">
//         Spark <span className="text-[#FAB12F] text-2xl">Decore</span>
//       </Link>

//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-white">
//           <div className="w-full max-w-sm">
//             <h1 className="text-3xl md:text-4xl font-bold text-[#005461]">
//               Create an Account
//             </h1>
//             <p className="text-gray-500 mb-6">
//               Register with Spark Decore
//             </p>

//             <form onSubmit={handleSubmit(handelRegistration)} className="space-y-4">
//               {/* Name */}
//               <div>
//                 <label className="font-medium">Name</label>
//                 <input
//                   {...register("name", { required: true, minLength: 3 })}
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
//                   placeholder="Your Name"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm">
//                     Name must be at least 3 characters
//                   </p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="font-medium">Email</label>
//                 <input
//                   type="email"
//                   {...register("email", { required: true })}
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
//                   placeholder="Email"
//                 />
//               </div>

//               {/* Photo */}
//               <div>
//                 <label className="font-medium">Photo</label>
//                 <input
//                   type="file"
//                   {...register("photo", { required: true })}
//                   className="file-input w-full"
//                 />
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
//                       pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/,
//                     })}
//                     className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
//                     placeholder="Password"
//                   />
//                   <span
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-3 top-3 cursor-pointer"
//                   >
//                     {showPass ? <TbEyeClosed /> : <PiEyeFill />}
//                   </span>
//                 </div>
//               </div>

//               {/* Terms */}
//               <div className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={termsChecked}
//                   onChange={() => setTermsChecked(!termsChecked)}
//                 />
//                 <span>
//                   I agree to the{" "}
//                   <Link to="/terms" className="text-[#005461] underline">
//                     Terms & Conditions
//                   </Link>
//                 </span>
//               </div>

//               <button
//                 disabled={!termsChecked}
//                 className="w-full bg-[#005461] hover:bg-[#00404A] text-white py-2 rounded-lg transition"
//               >
//                 Register
//               </button>
//             </form>

//             <p className="mt-4 text-sm">
//               Already have an account?
//               <Link to="/login" className="text-[#FAB12F] font-semibold">
//                 Login
//               </Link>
//             </p>

//             <div className="mt-4">
//               <SocialLogin />
//             </div>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#F3FAFA] p-6">
//           <img
//             src={regieterLogo}
//             alt="Register"
//             className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
//           />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { PiEyeFill } from "react-icons/pi";
import { TbEyeClosed } from "react-icons/tb";
import regieterLogo from "../../../assets/regester.png";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { createUser, updateUserProfile,  setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handelRegistration = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!termsChecked) {
      setErrorMessage("You must accept the Terms & Conditions");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      console.log(result.user);
      const profileImg = data.photo[0];
      console.log(data);
      const formData = new FormData();
      formData.append("image", profileImg);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
        formData
      );
    
      const photoURL = imgRes.data.data.url;
       console.log(photoURL)
      await updateUserProfile({ displayName: data.name, photoURL });
      setUser({ ...result.user, photoURL ,  
        email: data.email,
        displayName: data.name,});


      await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
        role: "user",
        createdAt: new Date(),
      });

      setSuccessMessage("Registration successful! Redirecting...");
      toast.success(' 🎉Register Successful')
      // setTimeout(() => {
        navigate(location.state || "/");
      // }, 1500);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <Link to="/" className="text-3xl font-bold mt-10 text-[#005461]">
        Spark <span className="text-[#FAB12F] text-2xl">Decore</span>
      </Link>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10 bg-white">
          <div className="w-full max-w-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-[#005461]">
              Create an Account
            </h1>
            <p className="text-gray-500 mb-6">
              Register with Spark Decore
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(handelRegistration)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="font-medium">Name <span className="text-red-500">*</span></label>
                <input
                  {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-medium">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Photo */}
              <div>
                <label className="font-medium">Photo <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  {...register("photo", { required: "Photo is required" })}
                  className="file-input w-full"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="font-medium">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                      pattern: { 
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/, 
                        message: "Password must contain uppercase, lowercase, and special character" 
                      },
                    })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FAB12F]"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showPass ? <TbEyeClosed /> : <PiEyeFill />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#005461] underline">
                    Terms & Conditions
                  </Link>
                </span>
              </div>

              <button
                disabled={!termsChecked}
                className="w-full bg-[#005461] hover:bg-[#00404A] cursor-pointer text-white py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-sm">
              Already have an account?
              <Link to="/login" className="text-[#FAB12F] font-semibold">
                Login
              </Link>
            </p>

            <div className="mt-4">
              <SocialLogin />
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#F3FAFA] p-6">
          <img
            src={regieterLogo}
            alt="Register"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </Container>
  );
};

export default Register;