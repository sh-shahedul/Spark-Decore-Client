// // import React, { useState } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// // import toast from "react-hot-toast";

// // const ManageDecorators = () => {
// //   const axiosSecure = useAxiosSecure();

// //   const [openModal, setOpenModal] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [specialty, setSpecialty] = useState("");
// //   const [phone, setPhone] = useState("");

// //   // Load all users
// //   const { data: users = [], isLoading, refetch } = useQuery({
// //     queryKey: ["users"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/users");
// //       return res.data;
// //     },
// //   });

// //   // Open Modal with selected user
// //   const handleOpenModal = (user) => {
// //     setSelectedUser(user);
// //     setOpenModal(true);
// //   };

// //   // Submit to add decorator
// //   const handleAddDecorator = async (e) => {
// //     e.preventDefault();

// //     if (!specialty || !phone) {
// //       toast.error("All fields required");
// //       return;
// //     }

// //     try {
// //       const res = await axiosSecure.post("/decorators", {
// //         name: selectedUser.displayName,
// //         email: selectedUser.email,
// //         specialty,
// //         phone,
// //       });

// //       if (res.data.success) {
// //         toast.success("Decorator assigned!");
// //         refetch();
// //         setOpenModal(false);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to assign decorator");
// //     }
// //   };

// //   if (isLoading) return <div>Loading...</div>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-3xl font-bold mb-4">Manage Decorators ({users.length})</h2>

// //       <div className="overflow-x-auto">
// //         <table className="table w-full border border-gray-300">
// //           <thead>
// //             <tr className="bg-gray-200 text-center">
// //               <th className="py-2 border">Photo</th>
// //               <th className="py-2 border">Name</th>
// //               <th className="py-2 border">Email</th>
// //               <th className="py-2 border">Role</th>
// //               <th className="py-2 border">Status</th>
// //               <th className="py-2 border">Make Decorator</th>
// //               <th className="py-2 border">Enable/Disable</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {users.map((user) => (
// //               <tr key={user._id} className="text-center border">
// //                 <td className="py-2 border">
// //                   <img
// //                     src={user?.photoURL}
// //                     alt={user?.displayName}
// //                     className="w-12 h-12 rounded-full mx-auto"
// //                   />
// //                 </td>

// //                 <td className="py-2 border">{user?.displayName}</td>
// //                 <td className="py-2 border">{user?.email}</td>

// //                 <td className="py-2 border capitalize">
// //                   {user.role === "decorator" ? (
// //                     <span className="badge badge-success">Decorator</span>
// //                   ) : (
// //                     user.role
// //                   )}
// //                 </td>

// //                 <td className="py-2 border capitalize">{user.status || "active"}</td>

// //                 <td className="py-2 border">
// //                   {user.role !== "decorator" ? (
// //                     <button
// //                       onClick={() => handleOpenModal(user)}
// //                       className="btn btn-sm btn-primary"
// //                     >
// //                       Make Decorator
// //                     </button>
// //                   ) : (
// //                     <span className="text-green-600 font-semibold">Already Decorator</span>
// //                   )}
// //                 </td>

// //                 <td className="py-2 border">
// //                   {user.role === "decorator" && (
// //                     <button
// //                       onClick={() => handleToggleStatus(user._id, user.status)}
// //                       className="btn btn-sm"
// //                     >
// //                       {user.status === "active" ? "Disable" : "Enable"}
// //                     </button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Modal */}
// //       {openModal && selectedUser && (
// //         <dialog open className="modal">
// //           <div className="modal-box">
// //             <h3 className="font-bold text-xl mb-4">Assign Decorator</h3>

// //             <form onSubmit={handleAddDecorator} className="space-y-4">

// //               <div>
// //                 <label>Email</label>
// //                 <input
// //                   type="text"
// //                   className="input input-bordered w-full"
// //                   value={selectedUser.email}
// //                   readOnly
// //                 />
// //               </div>

// //               <div>
// //                 <label>Name</label>
// //                 <input
// //                   type="text"
// //                   className="input input-bordered w-full"
// //                   value={selectedUser.displayName}
// //                   readOnly
// //                 />
// //               </div>

// //               <div>
// //                 <label>Specialty</label>
// //                 <select
// //                   className="select select-bordered w-full"
// //                   onChange={(e) => setSpecialty(e.target.value)}
// //                 >
// //                   <option value="">Select one</option>
// //                   <option value="Wedding">Wedding</option>
// //                   <option value="Birthday">Birthday</option>
// //                   <option value="Corporate">Corporate</option>
// //                   <option value="Stage Decoration">Stage Decoration</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label>Phone Number</label>
// //                 <input
// //                   type="text"
// //                   className="input input-bordered w-full"
// //                   onChange={(e) => setPhone(e.target.value)}
// //                   placeholder="018XXXXXXXX"
// //                 />
// //               </div>

// //               <button type="submit" className="btn btn-primary w-full">
// //                 Submit
// //               </button>
// //             </form>

// //             <button
// //               className="btn btn-sm mt-4"
// //               onClick={() => setOpenModal(false)}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </dialog>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManageDecorators;





// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const ManageDecorators = () => {
//   const axiosSecure = useAxiosSecure();

//   const [openModal, setOpenModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [specialty, setSpecialty] = useState("");
//   const [phone, setPhone] = useState("");

//   const { data: users = [], isLoading, refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => (await axiosSecure.get("/users")).data,
//   });

//   // Open Add Modal
//   const handleOpenModal = (user) => {
//     setSelectedUser(user);
//     setSpecialty("");
//     setPhone("");
//     setOpenModal(true);
//   };

//   // Add Decorator
//   const handleAddDecorator = async (e) => {
//     e.preventDefault();
//     if (!specialty || !phone) return toast.error("All fields required");
//     try {
//       const res = await axiosSecure.post("/decorators", {
//         name: selectedUser.displayName,
//         email: selectedUser.email,
//         specialty,
//         phone,
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

//   // Toggle Status
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

//   // Open Edit Modal
//   const handleEditModal = (user) => {
//     setSelectedUser(user);
//     setSpecialty(user.specialty);
//     setPhone(user.phone);
//     setEditModal(true);
//   };

//   // Update Decorator
//   const handleUpdateDecorator = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosSecure.patch(`/decorators/${selectedUser._id}`, {
//         specialty,
//         phone,
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

//   // Delete Decorator
//   const handleDeleteDecorator = async (id) => {
//     if (!confirm("Are you sure you want to delete this decorator?")) return;
//     try {
//       const res = await axiosSecure.delete(`/decorators/${id}`);
//       if (res.data.success) {
//         toast.success("Decorator Deleted");
//         refetch();
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch {
//       toast.error("Deletion failed");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Manage Decorators</h2>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead>
//             <tr className="bg-gray-200 text-center">
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Specialty</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Edit</th>
//               <th>Delete</th>
//               <th>Make Decorator</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="text-center border">
//                 <td>
//                   <img
//                     src={user.photoURL}
//                     alt={user.displayName}
//                     className="w-12 h-12 rounded-full mx-auto"
//                   />
//                 </td>
//                 <td>{user.displayName}</td>
//                 <td>{user.email}</td>
//                 <td>{user.specialty || "-"}</td>
//                 <td>{user.phone || "-"}</td>

//                 <td>
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() =>
//                         handleToggleStatus(user._id, user.status)
//                       }
//                       className="btn btn-xs"
//                     >
//                       {user.status === "active" ? "Disable" : "Enable"}
//                     </button>
//                   )}
//                 </td>

//                 <td>
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleEditModal(user)}
//                       className="btn btn-xs btn-warning"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </td>

//                 <td>
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleDeleteDecorator(user._id)}
//                       className="btn btn-xs btn-error"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>

//                 <td>
//                   {user.role !== "decorator" ? (
//                     <button
//                       onClick={() => handleOpenModal(user)}
//                       className="btn btn-xs btn-primary"
//                     >
//                       Make Decorator
//                     </button>
//                   ) : (
//                     <span className="text-green-600 font-bold">Decorator</span>
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
//           <div className="modal-box">
//             <h3 className="font-bold text-xl mb-4">Assign Decorator</h3>

//             <form onSubmit={handleAddDecorator} className="space-y-4">
//               <input
//                 readOnly
//                 value={selectedUser.email}
//                 className="input input-bordered w-full"
//               />
//               <input
//                 readOnly
//                 value={selectedUser.displayName}
//                 className="input input-bordered w-full"
//               />

//               <select
//                 className="select select-bordered w-full"
//                 onChange={(e) => setSpecialty(e.target.value)}
//               >
//                 <option value="">Select Specialty</option>
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input
//                 className="input input-bordered w-full"
//                 placeholder="Phone"
//                 onChange={(e) => setPhone(e.target.value)}
//               />

//               <button className="btn btn-primary w-full">Submit</button>
//             </form>

//             <button
//               className="btn btn-sm mt-4"
//               onClick={() => setOpenModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </dialog>
//       )}

//       {/* Edit Modal */}
//       {editModal && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-xl mb-4">Edit Decorator</h3>

//             <form onSubmit={handleUpdateDecorator} className="space-y-4">
//               <input
//                 readOnly
//                 value={selectedUser.email}
//                 className="input input-bordered w-full"
//               />

//               <select
//                 value={specialty}
//                 className="select select-bordered w-full"
//                 onChange={(e) => setSpecialty(e.target.value)}
//               >
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input
//                 className="input input-bordered w-full"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />

//               <button className="btn btn-primary w-full">Update</button>
//             </form>

//             <button
//               className="btn btn-sm mt-4"
//               onClick={() => setEditModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );
// };

// export default ManageDecorators;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2"; 

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

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="">
//       <h2 className="text-3xl font-bold mb-6 text-[#FAB12F] text-center mt-5">Manage Decorators</h2>

//       {/* Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-5 mb-10">
//         <div className="bg-blue-100 text-blue-800 p-10 flex justify-center items-center rounded shadow text-2xl font-bold">
//           Total Decorator: <span className="font-semibold text-xl mt-1"> &nbsp;{totalDecorators} </span>
//         </div>
//         <div className="bg-green-100 text-green-800 p-10 flex justify-center items-center rounded shadow text-2xl font-bold">
//           Active Decorator: <span className="font-semibold text-xl mt-1">&nbsp;{activeDecorators}</span>
//         </div>
//         <div className="bg-red-100 text-red-600 p-10 flex justify-center items-center rounded shadow text-2xl font-bold">
//           Disabled Decorator: <span className="font-semibold text-xl mt-1">&nbsp;{disabledDecorators}</span>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table w-full rounded-lg shadow">
//           <thead>
//             <tr className="bg-[#007b91] text-center text-white uppercase text-sm">
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Specialty</th>
//               <th>Phone</th>
//               <th>Rating</th>
//               <th>Status</th>
//               <th>Edit</th>
//               <th>Delete</th>
//               <th>Make Decorator</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="text-center border-b hover:bg-gray-50 transition">
//                 <td>
//                   <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full mx-auto" />
//                 </td>
//                 <td className="font-bold text-gray-500 ">{user.displayName}</td>
//                 <td className="text-blue-700 font-semibold">
//                   <span className="bg-blue-200 px-2 py-1 rounded-full">{user.email}</span>
//                 </td>
//                 <td className="text-green-600 font-bold">{user.specialty || "-"}</td>
//                 <td className="text-gray-500 font-bold">{user.phone || "-"}</td>
//                 <td className="text-yellow-400 font-bold">{user.rating || "-"} ⭐</td>
//                 <td>
//                   {user.role === "decorator" ? (
//                     <div className="flex justify-center items-center gap-2">
//                       <span
//                         className={`px-2 py-1 rounded-full text-white font-semibold ${
//                           user.status === "active" ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       >
//                         {user.status}
//                       </span>
//                       <button
//                         onClick={() => handleToggleStatus(user._id, user.status)}
//                         className="btn btn-xs btn-outline font-semibold"
//                       >
//                         {user.status === "active" ? "Disable" : "Enable"}
//                       </button>
//                     </div>
//                   ) : (
//                     "-"
//                   )}
//                 </td>
//                 <td>
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleEditModal(user)}
//                       className="btn btn-xs btn-warning rounded-lg font-bold px-4 py-2 hover:scale-105 transition"
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleDeleteDecorator(user._id)}
//                       className="btn btn-xs btn-error rounded-lg font-bold px-4 py-2 hover:scale-105 transition"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </td>
//                 {/* <td>
//                   {user.role !== "decorator" ? (
//                     <button
//                       onClick={() => handleOpenModal(user)}
//                       className="btn btn-xs btn-primary rounded-lg font-bold px-4 py-2 hover:scale-105 transition"
//                     >
//                       Make Decorator
//                     </button>
//                   ) : (
//                     <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full font-bold">Decorator</span>
//                   )}
//                 </td> */}
//                 <td>
//   {user.role === "admin" ? (
//     <span className="text-purple-600 bg-purple-200 px-2 py-1 rounded-full font-bold">
//       Admin
//     </span>
//   ) : user.role !== "decorator" ? (
//     <button
//       onClick={() => handleOpenModal(user)}
//       className="btn btn-xs btn-primary rounded-lg font-bold px-4 py-2 hover:scale-105 transition"
//     >
//       Make Decorator
//     </button>
//   ) : (
//     <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full font-bold">
//       Decorator
//     </span>
//   )}
// </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Modal */}
//       {openModal && (
//         <dialog open className="modal">
//           <div className="modal-box bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
//             <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Assign Decorator</h3>

//             <form onSubmit={handleAddDecorator} className="space-y-4">
//               <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100" />
//               <input readOnly value={selectedUser.displayName} className="input input-bordered w-full bg-gray-100" />

//               <select className="select select-bordered w-full" onChange={(e) => setSpecialty(e.target.value)} value={specialty}>
//                 <option value="">Select Specialty</option>
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input className="input input-bordered w-full" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

//               <input
//                 type="number"
//                 className="input input-bordered w-full"
//                 placeholder="Rating (1-5)"
//                 min={1}
//                 max={5}
//                 step="0.1"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//               />

//               <button className="btn btn-primary w-full py-3 text-lg font-semibold hover:scale-105 transition">Submit</button>
//             </form>

//             <button className="btn btn-outline btn-sm mt-6 w-full" onClick={() => setOpenModal(false)}>
//               Close
//             </button>
//           </div>
//         </dialog>
//       )}

//       {/* Edit Modal */}
//       {editModal && (
//         <dialog open className="modal">
//           <div className="modal-box bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
//             <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">Edit Decorator</h3>

//             <form onSubmit={handleUpdateDecorator} className="space-y-4">
//               <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-gray-100" />

//               <select value={specialty} className="select select-bordered w-full" onChange={(e) => setSpecialty(e.target.value)}>
//                 <option value="">Select Specialty</option>
//                 <option value="Wedding">Wedding</option>
//                 <option value="Corporate">Corporate</option>
//                 <option value="Birthday">Birthday</option>
//               </select>

//               <input className="input input-bordered w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />

//               <input
//                 type="number"
//                 className="input input-bordered w-full"
//                 placeholder="Rating (1-5)"
//                 min={1}
//                 max={5}
//                 step="0.1"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//               />

//               <button className="btn btn-warning w-full py-3 text-lg font-semibold hover:scale-105 transition">Update</button>
//             </form>

//             <button className="btn btn-outline btn-sm mt-6 w-full" onClick={() => setEditModal(false)}>
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

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  // Summary counts
  const totalDecorators = users.filter(u => u.role === "decorator").length;
  const activeDecorators = users.filter(u => u.role === "decorator" && u.status === "active").length;
  const disabledDecorators = users.filter(u => u.role === "decorator" && u.status === "disabled").length;

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
            {users.map((user) => (
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