// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2"; 
// import Loading from "../../../../Component/Loading/Loading";

// const ManageDecorators = () => {
//   const axiosSecure = useAxiosSecure();

//   const [openModal, setOpenModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [specialty, setSpecialty] = useState("");
//   const [phone, setPhone] = useState("");
//   const [rating, setRating] = useState("");

//   const { data: users = [], isLoading, refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => (await axiosSecure.get("/users")).data,
//   });

//   // Summary counts
//   const totalDecorators = users.filter(u => u.role === "decorator").length;
//   const activeDecorators = users.filter(u => u.role === "decorator" && u.status === "active").length;
//   const disabledDecorators = users.filter(u => u.role === "decorator" && u.status === "disabled").length;

//   const handleOpenModal = (user) => {
//     setSelectedUser(user);
//     setSpecialty("");
//     setPhone("");
//     setRating("");
//     setOpenModal(true);
//   };

//   const handleAddDecorator = async (e) => {
//     e.preventDefault();
//     const numericRating = parseFloat(rating);
//     if (!specialty || !phone || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
//       return toast.error("All fields required and rating must be between 1 and 5");
//     }
//     try {
//       const res = await axiosSecure.post("/decorators", {
//         name: selectedUser.displayName,
//         email: selectedUser.email,
//         specialty,
//         phone,
//         rating: numericRating,
//       });
//       if (res.data.success) {
//         toast.success("Decorator Assigned");
//         refetch();
//         setOpenModal(false);
//       }
//     } catch {
//       toast.error("Failed to assign");
//     }
//   };

//   const handleToggleStatus = async (id, status) => {
//     try {
//       await axiosSecure.patch(`/users/decorator-status/${id}`, {
//         status: status === "active" ? "disabled" : "active",
//       });
//       toast.success("Status updated");
//       refetch();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const handleEditModal = (user) => {
//     setSelectedUser(user);
//     setSpecialty(user.specialty);
//     setPhone(user.phone);
//     setRating(user.rating || "");
//     setEditModal(true);
//   };

//   const handleUpdateDecorator = async (e) => {
//     e.preventDefault();
//     const numericRating = parseFloat(rating);
//     if (!specialty || !phone || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
//       return toast.error("All fields required and rating must be between 1 and 5");
//     }
//     try {
//       const res = await axiosSecure.patch(`/decorators/${selectedUser._id}`, {
//         specialty,
//         phone,
//         rating: numericRating,
//       });
//       if (res.data.modifiedCount) {
//         toast.success("Decorator Updated");
//         refetch();
//         setEditModal(false);
//       }
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   const handleDeleteDecorator = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/decorators/${id}`);
//         if (res.data.success) {
//           Swal.fire("Deleted!", "Decorator has been deleted.", "success");
//           refetch();
//         } else {
//           Swal.fire("Failed!", res.data.message, "error");
//         }
//       } catch {
//         Swal.fire("Error!", "Deletion failed", "error");
//       }
//     }
//   };

//   if (isLoading) return <Loading></Loading>

//   return (
//     <div className="px-2 sm:px-4 lg:px-6">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] text-center mt-5">Manage Decorators</h2>

//       {/* Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-10 mb-6 sm:mb-10">
//         <div className="bg-blue-100 text-blue-800 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
//           <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Total Decorator:</span>
//           <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{totalDecorators}</span>
//         </div>
//         <div className="bg-green-100 text-green-800 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
//           <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Active Decorator:</span>
//           <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{activeDecorators}</span>
//         </div>
//         <div className="bg-red-100 text-red-600 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
//           <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Disabled Decorator:</span>
//           <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{disabledDecorators}</span>
//         </div>
//       </div>

//       <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#007b91] text-white">
//             <tr>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Photo</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Name</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Email</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Specialty</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Phone</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Rating</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Status</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Edit</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Delete</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Make Decorator</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {users.map((user) => (
//               <tr key={user._id} className="text-center hover:bg-gray-50 transition">
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto" />
//                 </td>
//                 <td className="px-2 sm:px-3 py-2 font-bold text-gray-500 text-xs sm:text-sm whitespace-nowrap">{user.displayName}</td>
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   <span className="bg-blue-200 text-blue-700 font-semibold px-2 py-1 rounded-full text-xs sm:text-sm">
//                     {user.email}
//                   </span>
//                 </td>
//                 <td className="px-2 sm:px-3 py-2 text-green-600 font-bold text-xs sm:text-sm whitespace-nowrap">{user.specialty || "-"}</td>
//                 <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{user.phone || "-"}</td>
//                 <td className="px-2 sm:px-3 py-2 text-yellow-400 font-bold text-xs sm:text-sm whitespace-nowrap">{user.rating || "-"} ⭐</td>
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   {user.role === "decorator" ? (
//                     <div className="flex justify-center items-center gap-1 sm:gap-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-white font-semibold text-xs ${
//                           user.status === "active" ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       >
//                         {user.status}
//                       </span>
//                       <button
//                         onClick={() => handleToggleStatus(user._id, user.status)}
//                         className="btn btn-xs btn-outline font-semibold text-xs"
//                       >
//                         {user.status === "active" ? "Disable" : "Enable"}
//                       </button>
//                     </div>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleEditModal(user)}
//                       className="btn btn-xs btn-warning rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </td>
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleDeleteDecorator(user._id)}
//                       className="btn btn-xs btn-error rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//                 <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                   {user.role === "admin" ? (
//                     <span className="text-purple-600 bg-purple-200 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       Admin
//                     </span>
//                   ) : user.role !== "decorator" ? (
//                     <button
//                       onClick={() => handleOpenModal(user)}
//                       className="btn btn-xs btn-primary rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs whitespace-nowrap"
//                     >
//                       Make Decorator
//                     </button>
//                   ) : (
//                     <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       Decorator
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Modal */}
//       {openModal && (
//         <dialog open className="modal">
//           <div className="modal-box bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-4">
//             <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-gray-800">Assign Decorator</h3>

//             <form onSubmit={handleAddDecorator} className="space-y-4">
//               <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100 text-sm" />
//               <input readOnly value={selectedUser.displayName} className="input input-bordered w-full bg-gray-100 text-sm" />

//               <select className="select select-bordered w-full text-sm" onChange={(e) => setSpecialty(e.target.value)} value={specialty}>
//                 <option value="">Select Specialty</option>
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input className="input input-bordered w-full text-sm" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

//               <input
//                 type="number"
//                 className="input input-bordered w-full text-sm"
//                 placeholder="Rating (1-5)"
//                 min={1}
//                 max={5}
//                 step="0.1"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//               />

//               <button className="btn btn-primary w-full py-2 sm:py-3 text-base sm:text-lg font-semibold hover:scale-105 transition">Submit</button>
//             </form>

//             <button className="btn btn-outline btn-sm mt-4 sm:mt-6 w-full" onClick={() => setOpenModal(false)}>
//               Close
//             </button>
//           </div>
//         </dialog>
//       )}

//       {/* Edit Modal */}
//       {editModal && (
//         <dialog open className="modal">
//           <div className="modal-box bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-4">
//             <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-gray-800">Edit Decorator</h3>

//             <form onSubmit={handleUpdateDecorator} className="space-y-4">
//               <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100 text-sm" />

//               <select value={specialty} className="select select-bordered w-full text-sm" onChange={(e) => setSpecialty(e.target.value)}>
//                 <option value="">Select Specialty</option>
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input className="input input-bordered w-full text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />

//               <input
//                 type="number"
//                 className="input input-bordered w-full text-sm"
//                 placeholder="Rating (1-5)"
//                 min={1}
//                 max={5}
//                 step="0.1"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//               />

//               <button className="btn btn-warning w-full py-2 sm:py-3 text-base sm:text-lg font-semibold hover:scale-105 transition">Update</button>
//             </form>

//             <button className="btn btn-outline btn-sm mt-4 sm:mt-6 w-full" onClick={() => setEditModal(false)}>
//               Close
//             </button>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default ManageDecorators;


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; 
import Loading from "../../../../Component/Loading/Loading";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  // Summary counts
  const totalDecorators = users.filter(u => u.role === "decorator").length;
  const activeDecorators = users.filter(u => u.role === "decorator" && u.status === "active").length;
  const disabledDecorators = users.filter(u => u.role === "decorator" && u.status === "disabled").length;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setSpecialty("");
    setPhone("");
    setRating("");
    setOpenModal(true);
  };

  const handleAddDecorator = async (e) => {
    e.preventDefault();
    const numericRating = parseFloat(rating);
    if (!specialty || !phone || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return toast.error("All fields required and rating must be between 1 and 5");
    }
    try {
      const res = await axiosSecure.post("/decorators", {
        name: selectedUser.displayName,
        email: selectedUser.email,
        specialty,
        phone,
        rating: numericRating,
      });
      if (res.data.success) {
        toast.success("Decorator Assigned");
        refetch();
        setOpenModal(false);
      }
    } catch {
      toast.error("Failed to assign");
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/users/decorator-status/${id}`, {
        status: status === "active" ? "disabled" : "active",
      });
      toast.success("Status updated");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleEditModal = (user) => {
    setSelectedUser(user);
    setSpecialty(user.specialty);
    setPhone(user.phone);
    setRating(user.rating || "");
    setEditModal(true);
  };

  const handleUpdateDecorator = async (e) => {
    e.preventDefault();
    const numericRating = parseFloat(rating);
    if (!specialty || !phone || isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return toast.error("All fields required and rating must be between 1 and 5");
    }
    try {
      const res = await axiosSecure.patch(`/decorators/${selectedUser._id}`, {
        specialty,
        phone,
        rating: numericRating,
      });
      if (res.data.modifiedCount) {
        toast.success("Decorator Updated");
        refetch();
        setEditModal(false);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDeleteDecorator = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/decorators/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Decorator has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Failed!", res.data.message, "error");
        }
      } catch {
        Swal.fire("Error!", "Deletion failed", "error");
      }
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] text-center mt-5">Manage Decorators</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-10 mb-6 sm:mb-10">
        <div className="bg-blue-100 text-blue-800 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
          <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Total Decorator:</span>
          <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{totalDecorators}</span>
        </div>
        <div className="bg-green-100 text-green-800 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
          <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Active Decorator:</span>
          <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{activeDecorators}</span>
        </div>
        <div className="bg-red-100 text-red-600 p-4 sm:p-6 md:p-10 flex flex-col sm:flex-row justify-center items-center rounded shadow">
          <span className="text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">Disabled Decorator:</span>
          <span className="font-semibold text-lg sm:text-xl ml-0 sm:ml-2">{disabledDecorators}</span>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#007b91] text-white">
            <tr>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Photo</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Name</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Email</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Specialty</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Phone</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Rating</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Status</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Edit</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Delete</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-center text-xs sm:text-sm whitespace-nowrap">Make Decorator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr key={user._id} className="text-center hover:bg-gray-50 transition">
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto" />
                </td>
                <td className="px-2 sm:px-3 py-2 font-bold text-gray-500 text-xs sm:text-sm whitespace-nowrap">{user.displayName}</td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  <span className="bg-blue-200 text-blue-700 font-semibold px-2 py-1 rounded-full text-xs sm:text-sm">
                    {user.email}
                  </span>
                </td>
                <td className="px-2 sm:px-3 py-2 text-green-600 font-bold text-xs sm:text-sm whitespace-nowrap">{user.specialty || "-"}</td>
                <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{user.phone || "-"}</td>
                <td className="px-2 sm:px-3 py-2 text-yellow-400 font-bold text-xs sm:text-sm whitespace-nowrap">{user.rating || "-"} ⭐</td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  {user.role === "decorator" ? (
                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white font-semibold text-xs ${
                          user.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        className="btn btn-xs btn-outline font-semibold text-xs"
                      >
                        {user.status === "active" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  {user.role === "decorator" && (
                    <button
                      onClick={() => handleEditModal(user)}
                      className="btn btn-xs btn-warning rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  {user.role === "decorator" && (
                    <button
                      onClick={() => handleDeleteDecorator(user._id)}
                      className="btn btn-xs btn-error rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs"
                    >
                      Delete
                    </button>
                  )}
                </td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  {user.role === "admin" ? (
                    <span className="text-purple-600 bg-purple-200 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
                      Admin
                    </span>
                  ) : user.role !== "decorator" ? (
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="btn btn-xs btn-primary rounded-lg font-bold px-2 sm:px-4 py-1 sm:py-2 hover:scale-105 transition text-xs whitespace-nowrap"
                    >
                      Make Decorator
                    </button>
                  ) : (
                    <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
                      Decorator
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 mb-4 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-[#859699] hover:bg-[#005461] cursor-pointer rounded-lg text-white"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1
                  ? "bg-[#005461] text-white font-semibold"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-[#859699] hover:bg-[#005461] cursor-pointer rounded-lg text-white"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-gray-600 mb-6">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, users.length)} of {users.length} users
      </div>

      {/* Add Modal */}
      {openModal && (
        <dialog open className="modal">
          <div className="modal-box bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-4">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-gray-800">Assign Decorator</h3>

            <form onSubmit={handleAddDecorator} className="space-y-4">
              <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100 text-sm" />
              <input readOnly value={selectedUser.displayName} className="input input-bordered w-full bg-gray-100 text-sm" />

              <select className="select select-bordered w-full text-sm" onChange={(e) => setSpecialty(e.target.value)} value={specialty}>
                <option value="">Select Specialty</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
              </select>

              <input className="input input-bordered w-full text-sm" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

              <input
                type="number"
                className="input input-bordered w-full text-sm"
                placeholder="Rating (1-5)"
                min={1}
                max={5}
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              <button className="btn btn-primary w-full py-2 sm:py-3 text-base sm:text-lg font-semibold hover:scale-105 transition">Submit</button>
            </form>

            <button className="btn btn-outline btn-sm mt-4 sm:mt-6 w-full" onClick={() => setOpenModal(false)}>
              Close
            </button>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {editModal && (
        <dialog open className="modal">
          <div className="modal-box bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-lg mx-4">
            <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-gray-800">Edit Decorator</h3>

            <form onSubmit={handleUpdateDecorator} className="space-y-4">
              <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100 text-sm" />

              <select value={specialty} className="select select-bordered w-full text-sm" onChange={(e) => setSpecialty(e.target.value)}>
                <option value="">Select Specialty</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
              </select>

              <input className="input input-bordered w-full text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />

              <input
                type="number"
                className="input input-bordered w-full text-sm"
                placeholder="Rating (1-5)"
                min={1}
                max={5}
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              <button className="btn btn-warning w-full py-2 sm:py-3 text-base sm:text-lg font-semibold hover:scale-105 transition">Update</button>
            </form>

            <button className="btn btn-outline btn-sm mt-4 sm:mt-6 w-full" onClick={() => setEditModal(false)}>
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageDecorators;