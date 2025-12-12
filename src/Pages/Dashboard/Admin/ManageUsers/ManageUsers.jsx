// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const ManageDecorators = () => {
//   const axiosSecure = useAxiosSecure();

//   const [openModal, setOpenModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [specialty, setSpecialty] = useState("");
//   const [phone, setPhone] = useState("");

//   // Load all users
//   const { data: users = [], isLoading, refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   // Open Modal with selected user
//   const handleOpenModal = (user) => {
//     setSelectedUser(user);
//     setOpenModal(true);
//   };

//   // Submit to add decorator
//   const handleAddDecorator = async (e) => {
//     e.preventDefault();

//     if (!specialty || !phone) {
//       toast.error("All fields required");
//       return;
//     }

//     try {
//       const res = await axiosSecure.post("/decorators", {
//         name: selectedUser.displayName,
//         email: selectedUser.email,
//         specialty,
//         phone,
//       });

//       if (res.data.success) {
//         toast.success("Decorator assigned!");
//         refetch();
//         setOpenModal(false);
//       }
//     } catch (err) {
//       toast.error("Failed to assign decorator");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Manage Decorators ({users.length})</h2>

//       <div className="overflow-x-auto">
//         <table className="table w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200 text-center">
//               <th className="py-2 border">Photo</th>
//               <th className="py-2 border">Name</th>
//               <th className="py-2 border">Email</th>
//               <th className="py-2 border">Role</th>
//               <th className="py-2 border">Status</th>
//               <th className="py-2 border">Make Decorator</th>
//               <th className="py-2 border">Enable/Disable</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="text-center border">
//                 <td className="py-2 border">
//                   <img
//                     src={user?.photoURL}
//                     alt={user?.displayName}
//                     className="w-12 h-12 rounded-full mx-auto"
//                   />
//                 </td>

//                 <td className="py-2 border">{user?.displayName}</td>
//                 <td className="py-2 border">{user?.email}</td>

//                 <td className="py-2 border capitalize">
//                   {user.role === "decorator" ? (
//                     <span className="badge badge-success">Decorator</span>
//                   ) : (
//                     user.role
//                   )}
//                 </td>

//                 <td className="py-2 border capitalize">{user.status || "active"}</td>

//                 <td className="py-2 border">
//                   {user.role !== "decorator" ? (
//                     <button
//                       onClick={() => handleOpenModal(user)}
//                       className="btn btn-sm btn-primary"
//                     >
//                       Make Decorator
//                     </button>
//                   ) : (
//                     <span className="text-green-600 font-semibold">Already Decorator</span>
//                   )}
//                 </td>

//                 <td className="py-2 border">
//                   {user.role === "decorator" && (
//                     <button
//                       onClick={() => handleToggleStatus(user._id, user.status)}
//                       className="btn btn-sm"
//                     >
//                       {user.status === "active" ? "Disable" : "Enable"}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {openModal && selectedUser && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-xl mb-4">Assign Decorator</h3>

//             <form onSubmit={handleAddDecorator} className="space-y-4">

//               <div>
//                 <label>Email</label>
//                 <input
//                   type="text"
//                   className="input input-bordered w-full"
//                   value={selectedUser.email}
//                   readOnly
//                 />
//               </div>

//               <div>
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   className="input input-bordered w-full"
//                   value={selectedUser.displayName}
//                   readOnly
//                 />
//               </div>

//               <div>
//                 <label>Specialty</label>
//                 <select
//                   className="select select-bordered w-full"
//                   onChange={(e) => setSpecialty(e.target.value)}
//                 >
//                   <option value="">Select one</option>
//                   <option value="Wedding">Wedding</option>
//                   <option value="Birthday">Birthday</option>
//                   <option value="Corporate">Corporate</option>
//                   <option value="Stage Decoration">Stage Decoration</option>
//                 </select>
//               </div>

//               <div>
//                 <label>Phone Number</label>
//                 <input
//                   type="text"
//                   className="input input-bordered w-full"
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="018XXXXXXXX"
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary w-full">
//                 Submit
//               </button>
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
//     </div>
//   );
// };

// export default ManageDecorators;





import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  // Open Add Modal
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setSpecialty("");
    setPhone("");
    setOpenModal(true);
  };

  // Add Decorator
  const handleAddDecorator = async (e) => {
    e.preventDefault();
    if (!specialty || !phone) return toast.error("All fields required");
    try {
      const res = await axiosSecure.post("/decorators", {
        name: selectedUser.displayName,
        email: selectedUser.email,
        specialty,
        phone,
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

  // Toggle Status
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

  // Open Edit Modal
  const handleEditModal = (user) => {
    setSelectedUser(user);
    setSpecialty(user.specialty);
    setPhone(user.phone);
    setEditModal(true);
  };

  // Update Decorator
  const handleUpdateDecorator = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/decorators/${selectedUser._id}`, {
        specialty,
        phone,
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

  // Delete Decorator
  const handleDeleteDecorator = async (id) => {
    if (!confirm("Are you sure you want to delete this decorator?")) return;
    try {
      const res = await axiosSecure.delete(`/decorators/${id}`);
      if (res.data.success) {
        toast.success("Decorator Deleted");
        refetch();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Deletion failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Decorators</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Make Decorator</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border">
                <td>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.specialty || "-"}</td>
                <td>{user.phone || "-"}</td>

                <td>
                  {user.role === "decorator" && (
                    <button
                      onClick={() =>
                        handleToggleStatus(user._id, user.status)
                      }
                      className="btn btn-xs"
                    >
                      {user.status === "active" ? "Disable" : "Enable"}
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "decorator" && (
                    <button
                      onClick={() => handleEditModal(user)}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "decorator" && (
                    <button
                      onClick={() => handleDeleteDecorator(user._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}
                </td>

                <td>
                  {user.role !== "decorator" ? (
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Decorator
                    </button>
                  ) : (
                    <span className="text-green-600 font-bold">Decorator</span>
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
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Assign Decorator</h3>

            <form onSubmit={handleAddDecorator} className="space-y-4">
              <input
                readOnly
                value={selectedUser.email}
                className="input input-bordered w-full"
              />
              <input
                readOnly
                value={selectedUser.displayName}
                className="input input-bordered w-full"
              />

              <select
                className="select select-bordered w-full"
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="">Select Specialty</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
              </select>

              <input
                className="input input-bordered w-full"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />

              <button className="btn btn-primary w-full">Submit</button>
            </form>

            <button
              className="btn btn-sm mt-4"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}

      {/* Edit Modal */}
      {editModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Edit Decorator</h3>

            <form onSubmit={handleUpdateDecorator} className="space-y-4">
              <input
                readOnly
                value={selectedUser.email}
                className="input input-bordered w-full"
              />

              <select
                value={specialty}
                className="select select-bordered w-full"
                onChange={(e) => setSpecialty(e.target.value)}
              >
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
              </select>

              <input
                className="input input-bordered w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button className="btn btn-primary w-full">Update</button>
            </form>

            <button
              className="btn btn-sm mt-4"
              onClick={() => setEditModal(false)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageDecorators;

