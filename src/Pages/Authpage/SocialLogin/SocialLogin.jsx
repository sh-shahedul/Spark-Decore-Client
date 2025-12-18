import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const SocialLogin = () => {
    
    const { googleSignIn } = useAuth();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();
    const location = useLocation();

    const handelGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;

                const userInfo = {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: "user",
                };

                //USER POST TO DATABASE
                axiosSecure.post("/users", userInfo)
                    .then(res => {
                        console.log("DB Response:", res.data);
                    })
                    .catch(err => {
                        console.log("DB Error:", err);
                    });
                  toast.success(" 🎉 Login Successful")
                navigate(location.state || "/");
            })
            .catch(error => {
                console.log("Google Login Error:", error);
            });
    };

    return (
        <div>

            <div className="divider before:bg-yellow-400 after:bg-yellow-400 my-4">OR</div>

            <button 
                onClick={handelGoogle}
                className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 bg-white text-black border border-yellow-400 rounded-lg hover:bg-yellow-100 transition-colors font-bold"
            >
                <FcGoogle /> Login with Google
            </button>

        </div>
    );
};

export default SocialLogin;
