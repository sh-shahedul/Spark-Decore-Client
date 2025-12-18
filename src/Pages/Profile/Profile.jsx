// import React, { useEffect, useState } from "react";
// import { updateProfile } from "firebase/auth";
// import toast from "react-hot-toast";
// import { MdVerifiedUser, MdLocationOn, MdEmail, MdEdit } from "react-icons/md";
// import useAuth from "../../hooks/useAuth";
// import logo from "../../assets/user.png";

// const Profile = () => {
//   const { user, setuser } = useAuth();
//   const [fullName, setFullName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     if (user) {
//       setFullName(user.displayName || "");
//       setPhotoURL(user.photoURL || "");
//     }
//   }, [user]);

//   const handleUpdateProfile = () => {
//     if (!user) return toast.error("No user found!");

//     updateProfile(user, {
//       displayName: fullName,
//       photoURL: photoURL,
//     })
//       .then(() => {
//         setuser({ ...user, displayName: fullName, photoURL: photoURL });
//         toast.success("Profile updated successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Failed to update profile.");
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
//       <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
//         {/* Left Side - Profile Card */}
//         <div className="md:w-1/3 bg-gradient-to-b from-pink-500 to-red-500 text-white flex flex-col items-center p-8">
//           <img
//             src={photoURL || logo}
//             alt="User Avatar"
//             className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover mb-4"
//           />
//           <h1 className="text-2xl font-bold mb-1">{user?.displayName}</h1>
//           <div className="flex items-center gap-1 mb-3">
//             <MdVerifiedUser className="text-white" /> <span>Verified User</span>
//           </div>
//           <div className="flex items-center gap-2 mb-1">
//             <MdEmail /> <span>{user?.email}</span>
//           </div>
//           {address && (
//             <div className="flex items-center gap-2 mt-1">
//               <MdLocationOn /> <span>{address}</span>
//             </div>
//           )}
//         </div>

//         {/* Right Side - Editable Form */}
//         <div className="md:w-2/3 p-8 bg-gray-50">
//           <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>

//           {/* Full Name */}
//           <div className="mb-5">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* Photo URL */}
//           <div className="mb-5">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Photo URL
//             </label>
//             <input
//               type="text"
//               value={photoURL}
//               onChange={(e) => setPhotoURL(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
//               placeholder="Enter your photo URL"
//             />
//           </div>

//           {/* Address */}
//           <div className="mb-5">
//             <label className="block text-gray-700 font-semibold mb-2">
//               Address
//             </label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
//               placeholder="Enter your address"
//             />
//           </div>

//           {/* Update Button */}
//           <button
//             onClick={handleUpdateProfile}
//             className="flex items-center gap-2 justify-center bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 transition-all text-white font-bold px-6 py-3 rounded-full shadow-lg"
//           >
//             <MdEdit /> Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Component/Loading/Loading";
import { Camera, Mail, User, Save, Edit2, X, Check } from "lucide-react";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get("/users/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    axiosSecure
      .patch("/users/profile", {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      })
      .then(() => {
        alert("Profile updated successfully ✅");
        setIsEditing(false);
        setIsSaving(false);
      })
      .catch(() => setIsSaving(false));
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #f0f9fa 0%, #fff8e6 100%)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
          {/* Decorative Top Wave */}
          <div className="absolute top-0 left-0 right-0 h-2" style={{ background: 'linear-gradient(90deg, #005461 0%, #FAB12F 100%)' }}></div>
          
          {/* Profile Header Section */}
          <div className="relative pt-12 pb-6 px-8">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 right-0 h-32 opacity-5" style={{ 
              backgroundImage: 'radial-gradient(circle, #005461 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
            
            <div className="relative flex flex-col items-center">
              {/* Profile Image with Glow Effect */}
              <div className="relative group mb-4">
                <div className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" style={{ backgroundColor: '#005461' }}></div>
                <img
                  src={profile.photoURL}
                  alt="profile"
                  className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute bottom-0 right-0 rounded-full p-2 shadow-lg border-2 border-white" style={{ backgroundColor: '#FAB12F' }}>
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-1" style={{ color: '#005461' }}>{profile.displayName}</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
                <p>{profile.email}</p>
              </div>

              {/* Edit Toggle Button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 flex items-center gap-2 px-6 py-2.5 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-medium"
                  style={{ background: 'linear-gradient(135deg, #005461 0%, #00707f 100%)' }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgba(250,177,47,0.1)', color: '#FAB12F' }}>
                  <Edit2 className="w-4 h-4" />
                  Editing Mode
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mx-8" style={{ background: 'linear-gradient(90deg, transparent 0%, #005461 50%, transparent 100%)' }}></div>

          {/* Profile Information Section */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5" style={{ color: '#005461' }} />
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
            </div>

            {!isEditing ? (
              // View Mode
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    Display Name
                  </label>
                  <p className="text-base font-semibold text-gray-800">{profile.displayName}</p>
                </div>

                <div className="p-5 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    Photo URL
                  </label>
                  <p className="text-sm text-gray-600 break-all">{profile.photoURL}</p>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-5">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#005461' }}></span>
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) =>
                      setProfile({ ...profile, displayName: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 outline-none focus:shadow-lg"
                    style={{ 
                      borderColor: '#e5e7eb',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#005461'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    placeholder="Enter your display name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FAB12F' }}></span>
                    Photo URL
                  </label>
                  <input
                    type="text"
                    value={profile.photoURL}
                    onChange={(e) =>
                      setProfile({ ...profile, photoURL: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 outline-none focus:shadow-lg"
                    style={{ 
                      borderColor: '#e5e7eb',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#005461'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    placeholder="Enter photo URL"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 text-white py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                    style={{ background: 'linear-gradient(135deg, #005461 0%, #FAB12F 100%)' }}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-md flex items-center gap-2"
                    style={{ backgroundColor: 'rgba(0,84,97,0.05)', color: '#005461' }}
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Info Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FAB12F' }}></div>
            <span className="text-sm font-medium text-gray-600">Profile is {isEditing ? 'in edit mode' : 'up to date'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;