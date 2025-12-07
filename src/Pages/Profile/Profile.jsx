
import React, { useContext, useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
 import toast from "react-hot-toast";

import logo from '../../assets/user.png'
import { MdVerifiedUser } from "react-icons/md";
import useAuth from "../../hooks/useAuth";


   const Profile = () => {
   const { user, setuser } = useAuth() ;
  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (!user) return toast.error("No user found!");

    updateProfile(user, {
      displayName: fullName,
      photoURL: photoURL,
    })
      .then(() => {
        setuser({ ...user, displayName: fullName, photoURL: photoURL });
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white/25 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-10">
        
        {/*  Left Side  */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          {/* Title */}
          <h2 className="text-2xl font-bold text-pink-600 mb-6">
            <span className="text-3xl">M</span>y <span className="text-black">Profile</span>
          </h2>

          {/* Avatar */}
          <img
            src={photoURL || logo}
            alt="User Avatar"
            className="w-36 h-36 rounded-full object-cover border-4 border-pink-600 shadow-md mb-4"
          />
            <h1 className="font-bold">{user?.displayName}</h1>
            <h1 className="font-semibold">{user?.email}</h1>
            <h2 className="flex gap-1 items-center text-pink-600 font-bold text-base border-2 px-5 mt-3 py-1 rounded-lg border-pink-500"><MdVerifiedUser size={20} /> USER</h2>
         
        </div>

        {/*  Right Side */}
        <div className="w-full md:w-2/3">
          {/* Name */}
          <h3 className="font-bold text-xl mb-2">Change Your Information</h3>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
            />
          </div>

         
          {/* Photo URL Field */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Paste your photo URL here"
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your address"
            />
          </div>
           {/* Update Button */}
          <button
            onClick={handleUpdateProfile}
            className=" font-bold px-4 py-2 rounded-2xl bg-linear-to-r from-pink-500 to-red-500 text-white   hover:from-pink-400 hover:via-red-500 hover:to-pink-500 transition-all duration-300 "
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;