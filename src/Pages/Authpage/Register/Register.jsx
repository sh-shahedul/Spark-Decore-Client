
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { PiEyeFill } from 'react-icons/pi';
import { TbEyeClosed } from 'react-icons/tb';
import { FcGoogle } from "react-icons/fc";
import regieterLogo from "../../../assets/reg.png";
import Container from "../../../Component/Container/Container";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const {createUser} = useAuth()


   
  const handelRegistration = (data) => {
    
    createUser(data.email,data.password)
    .then(result =>{
        console.log(result.user)
    })
    .catch(error=>{
        console.log(error)
    })






    if (!termsChecked) {
      alert("You must accept the Terms & Conditions");
      return;
    }
    console.log("Form Data:", data);
    // ekhane API call korte paro
  };

  return (
    <div className="">
      <Container>
        <Link to='/' className="text-3xl font-bold mt-10" style={{ color: "#FFD93D" }}>
          Spark <span className="text-white text-2xl">Decore</span>
        </Link>

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left side form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 bg-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFD93D" }}>Create an Account</h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">Register with Spark Decore</p>

            <form onSubmit={handleSubmit(handelRegistration)} className="w-full max-w-sm space-y-4">
               {/* NAME FIELD */}
         <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
            <input
            type="text"
            {...register('name', { required: true, minLength: 3 })}
            className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yelow-400"
            placeholder="Your Name"
          />
          {errors.name?.type === 'required' && <p className="text-red-600 text-sm mt-1">Name is Required</p>}
          {errors.name?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Name must be at least 3 characters</p>}
        </div>

              {/* Email */}
               <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && <p className="text-red-600 text-sm mt-1">Email is Required</p>}
        </div>

              {/* Photo URL */}
            
        <div className="mb-4">
          <label className="block font-medium mb-1">Photo</label>
          
          <input
            type="file"
            {...register('photo', { required: true })}
            className=" file-input w-full   border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
            placeholder="Your Name"
          />
          {errors.photo?.type === 'required' && <p className="text-red-600 text-sm mt-1">Photo is Required</p>}
          
        </div>
           {/* Role Select Field */}
    <div className="mb-4">
     <label className="block font-medium mb-1 ">Select Role</label>
     <select
    {...register("role", { required: true })}
    className=" select w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
     >
    <option value="">-- Choose Role --</option>
    <option value="user">User</option>
    <option value="decorator">Decorator</option>
     </select>

      {errors.role && (
     <p className="text-red-600 text-sm mt-1">Role is Required</p>
       )}
    </div>


              {/* Password */}
              <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/
              })}
              className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 pr-10"
              placeholder="Password"
            />
            {/* toggle show pass */}
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 cursor-pointer text-gray-600"
            >
              {showPass ?  <TbEyeClosed /> : <PiEyeFill /> }
            </span>
          </div>
          {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is Required</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm mt-1">Password must contain at least one uppercase, one lowercase, and one special character.</p>}
        </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsChecked}
                  onChange={() => setTermsChecked(!termsChecked)}
                  className="h-4 w-4 text-yellow-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-gray-600 text-sm">
                  I agree to the <Link to="/terms" className="text-yellow-600 underline">Terms & Conditions</Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-600 text-black font-semibold py-2 rounded mt-2 disabled:opacity-50"
                disabled={!termsChecked}
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-4 text-gray-600 text-sm">
              Already have an account? <Link to="/login" className="text-yellow-600 font-semibold">Login</Link>
            </p>

            {/* Google Register */}
            <button className="mt-4 w-full md:w-[390px] border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-100">
              <FcGoogle size={20}/> Register with Google
            </button>
          </div>

          {/* Right side illustration */}
          <div className="w-full lg:w-1/2 bg-yellow-50 flex justify-center items-center p-6 md:p-10">
            <img 
              src={regieterLogo} 
              alt="Illustration" 
              className="max-w-full md:max-w-sm"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;



// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { PiEyeFill } from 'react-icons/pi';
// import { TbEyeClosed } from 'react-icons/tb';
// import { Link, useLocation, useNavigate } from 'react-router'; 
// import useAuth from '../../../Hooks/useAuth';
// import SocialLogin from '../SocialLogIn/SocialLogin';
// import axios from 'axios';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';

// const Register = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPass, setShowPass] = useState(false);
//    const location = useLocation()
//   //  console.log(location,'in register')
//    const navigate = useNavigate()
//  const  axiosSecure = useAxiosSecure()
//    const {createUser,updateUserProfile} = useAuth()
     

//   const handelRegistration = (data) => {
//     console.log(data.photo[0], 'after regiseter');
//     const profileImg = data.photo[0]
//     createUser(data.email,data.password)
//     .then(result=>{
//         console.log(result.user)
//           const formData = new FormData()
//      formData.append('image',profileImg)
//       navigate(location.state || '/')

//    const image_Api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`
//    axios.post(image_Api_url,formData)
//    .then(res=>{
//       const photoURL = res.data.data.url

//        // create user in Database 
//         const userInfo ={
//             email:data.email,
//             displayName:data.name,
//             photoURL : photoURL,
//         }
//          axiosSecure.post('/users',userInfo)
//          .then(res=>{
//             if(res.data.insertedId){
//                console.log('user created in the dataBase');
//             }
//          })

//       //update user profile to dataabse
//       const userProfile = {
//        displayName : data.name,
//        photoURL : photoURL,
//       }
//       updateUserProfile(userProfile)
//       .then(res=>{
//         console.log(res.user)
//       })
//       .catch(error =>{
//         console.log(error)
//       })
//    })
//     })
//     .catch(error=>{
//         console.log(error)
//     })
   
   


//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen  bg-gray-100">
//         <div  className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//       <form 
//         onSubmit={handleSubmit(handelRegistration)} 
       
//       >
//         <h2 className="md:text-4xl sm:3xl text-2xl font-bold ">Create an Account</h2>
//         <p className='md:text-lg font-medium mb-5'>Register with ZapShift</p>
        
//         {/* NAME FIELD */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Name</label>
//           <input
//             type="text"
//             {...register('name', { required: true, minLength: 3 })}
//             className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
//             placeholder="Your Name"
//           />
//           {errors.name?.type === 'required' && <p className="text-red-600 text-sm mt-1">Name is Required</p>}
//           {errors.name?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Name must be at least 3 characters</p>}
//         </div>
        // {/* Photo  */}
        // <div className="mb-4">
        //   <label className="block font-medium mb-1">Photo</label>
          
        //   <input
        //     type="file"
        //     {...register('photo', { required: true })}
        //     className=" file-input w-full   border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        //     placeholder="Your Name"
        //   />
        //   {errors.photo?.type === 'required' && <p className="text-red-600 text-sm mt-1">Photo is Required</p>}
          
        // </div>


        {/* EMAIL FIELD */}
        // <div className="mb-4">
        //   <label className="block font-medium mb-1">Email</label>
        //   <input
        //     type="email"
        //     {...register('email', { required: true })}
        //     className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        //     placeholder="Email"
        //   />
        //   {errors.email?.type === 'required' && <p className="text-red-600 text-sm mt-1">Email is Required</p>}
        // </div>

        {/* PASSWORD FIELD */}
        // <div className="mb-4">
        //   <label className="block font-medium mb-1">Password</label>
        //   <div className="relative">
        //     <input
        //       type={showPass ? "text" : "password"}
        //       {...register('password', {
        //         required: true,
        //         minLength: 6,
        //         pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/
        //       })}
        //       className="w-full p-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300 pr-10"
        //       placeholder="Password"
        //     />
        //     {/* toggle show pass */}
        //     <span
        //       onClick={() => setShowPass(!showPass)}
        //       className="absolute right-3 top-3.5 cursor-pointer text-gray-600"
        //     >
        //       {showPass ?  <TbEyeClosed /> : <PiEyeFill /> }
        //     </span>
        //   </div>
        //   {errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is Required</p>}
        //   {errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>}
        //   {errors.password?.type === 'pattern' && <p className="text-red-600 text-sm mt-1">Password must contain at least one uppercase, one lowercase, and one special character.</p>}
        // </div>

//         {/* CHECKBOX */}
//         <div className="mb-4 flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register("check", { required: true })}
//             className="w-4 h-4 accent-lime-300"
//           />
//           <label className="text-sm">I agree to the terms & conditions</label>
//         </div>
//         {errors.check && <p className="text-red-600 text-sm mt-1">You must agree before registering.</p>}

//         {/* REGISTER BUTTON */}
//         <button className="w-full py-2 bg-lime-300 text-black font-bold rounded-lg hover:bg-lime-400 transition-colors">
//           Register
//         </button>

//         {/* LOGIN LINK */}
//         <p className="mt-3 text-center text-sm">
//           Already have an account?{" "}
//           <Link state={location.state} to='/login' className="text-lime-500 font-bold hover:underline">
//             Login
//           </Link>
//         </p>

      
//       </form>
//       <SocialLogin></SocialLogin>
//       </div>
//     </div>
//   );
// };

// export default Register;