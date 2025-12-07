import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';


const SocialLogin = () => {
//   const axiosSecure = useAxiosSecure()
    const {googleSignIn}=useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    console.log('location on social',location)
    const handelGoogle =()=>{
           googleSignIn()
           .then(result=>{
            console.log(result.user)
             navigate(location.state || '/')
           

        //  const userInfo ={
        //     email:result.user.email,
        //     displayName:result.user.displayName,
        //     photoURL :result.user.photoURL,
        //    }
  
    //    axiosSecure.post('/users',userInfo)
    //    .then(res=>{
    //     console.log('user data hasbbeen store',res.data)
    //      navigate(location.state || '/')
    //    })


           })
           .catch(error=>{
           console.log(error)
          })
    }

    return (
        <div>
             {/* OR Divider */}
        <div className="divider before:bg-yellow-400 after:bg-yellow-400 my-4">OR</div>

        {/* GOOGLE BUTTON */}
        <button onClick={handelGoogle}  className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black border border-yellow-400 rounded-lg hover:bg-yellow-100 transition-colors font-bold">
          <FcGoogle /> Login with Google
        </button> 
        </div>
    );
};

export default SocialLogin;