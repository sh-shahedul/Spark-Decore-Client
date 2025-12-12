// // import React, { useState } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// // import toast from "react-hot-toast";

// // const ManageBookings = () => {
// //   const axiosSecure = useAxiosSecure();

// //   const [selectedBooking, setSelectedBooking] = useState(null);
// //   const [decoratorEmail, setDecoratorEmail] = useState("");
// //   const [decoratorName, setDecoratorName] = useState("");

// //   // Load all bookings
// //   const { data: bookings = [], isLoading, refetch } = useQuery({
// //     queryKey: ["bookings"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/bookings");
// //       return res.data;
// //     },
// //   });

// //   // -------- DELETE BOOKING ----------
// //   const handleDelete = async (id) => {
// //     const confirm = window.confirm("Are you sure to delete?");
// //     if (!confirm) return;

// //     const res = await axiosSecure.delete(`/bookings/${id}`);

// //     if (res.data.deletedCount > 0) {
// //       toast.success("Booking deleted!");
// //       refetch();
// //     }
// //   };

// //   // -------- UPDATE STATUS ----------
// //   const handleStatusUpdate = async (id, status) => {
// //     const res = await axiosSecure.patch(`/bookings/status/${id}`, { status });

// //     if (res.data.modifiedCount > 0) {
// //       toast.success("Status updated!");
// //       refetch();
// //     }
// //   };

// //   // -------- ASSIGN DECORATOR ----------
// //   const handleAssignDecorator = async () => {
// //     if (!decoratorEmail || !decoratorName) {
// //       toast.error("Please fill all decorator info!");
// //       return;
// //     }

// //     const res = await axiosSecure.patch(
// //       `/bookings/assign/${selectedBooking._id}`,
// //       {
// //         decoratorEmail,
// //         decoratorName,
// //       }
// //     );

// //     if (res.data.modifiedCount > 0) {
// //       toast.success("Decorator Assigned!");
// //       refetch();
// //       setSelectedBooking(null);
// //       setDecoratorEmail("");
// //       setDecoratorName("");
// //     }
// //   };

// //   if (isLoading) return <div>Loading...</div>;

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-3xl font-bold mb-4">
// //         Manage All Bookings ({bookings.length})
// //       </h2>

// //       <div className="overflow-x-auto">
// //         <table className="table w-full border">
// //           <thead className="bg-gray-200">
// //             <tr className="text-center">
// //               <th>User</th>
// //               <th>Email</th>
// //               <th>Service</th>
// //               <th>Date</th>
// //               <th>Payment</th>
// //               <th>Status</th>
// //               <th>Decorator</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {bookings.map((book) => (
// //               <tr key={book._id} className="text-center border">
// //                 <td>{book.userName}</td>
// //                 <td>{book.userEmail}</td>
// //                 <td>{book.serviceName}</td>
// //                 <td>{book.bookingDate}</td>
// //                 <td>
// //                   {book.paymentStatus === "paid" ? (
// //                     <span className="text-green-600 font-bold">PAID</span>
// //                   ) : (
// //                     <span className="text-red-600 font-bold">UNPAID</span>
// //                   )}
// //                 </td>

// //                 <td>{book.bookingStatus || "pending"}</td>

// //                 <td>
// //                   {book.decoratorName ? (
// //                     <>
// //                       <p>{book.decoratorName}</p>
// //                       <small className="text-gray-500">
// //                         {book.decoratorEmail}
// //                       </small>
// //                     </>
// //                   ) : (
// //                     "Not Assigned"
// //                   )}
// //                 </td>

// //                 <td className="space-y-2">

// //                   {/* Assign decorator only if paid */}
// //                   {book.paymentStatus === "paid" && (
// //                     <button
// //                       className="btn btn-sm btn-primary"
// //                       onClick={() => setSelectedBooking(book)}
// //                     >
// //                       Assign
// //                     </button>
// //                   )}

// //                   {/* Status update */}
// //                   <button
// //                     className="btn btn-sm btn-warning"
// //                     onClick={() =>
// //                       handleStatusUpdate(book._id, "confirmed")
// //                     }
// //                   >
// //                     Confirm
// //                   </button>

// //                   <button
// //                     className="btn btn-sm btn-success"
// //                     onClick={() =>
// //                       handleStatusUpdate(book._id, "completed")
// //                     }
// //                   >
// //                     Complete
// //                   </button>

// //                   {/* Delete */}
// //                   <button
// //                     className="btn btn-sm btn-error"
// //                     onClick={() => handleDelete(book._id)}
// //                   >
// //                     Delete
// //                   </button>

// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* ------------------ ASSIGN MODAL ------------------ */}
// //       {selectedBooking && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded shadow-lg w-96">

// //             <h3 className="text-xl font-bold mb-4">Assign Decorator</h3>

// //             <input
// //               type="text"
// //               className="input input-bordered w-full mb-2"
// //               placeholder="Decorator Name"
// //               value={decoratorName}
// //               onChange={(e) => setDecoratorName(e.target.value)}
// //             />

// //             <input
// //               type="email"
// //               className="input input-bordered w-full mb-4"
// //               placeholder="Decorator Email"
// //               value={decoratorEmail}
// //               onChange={(e) => setDecoratorEmail(e.target.value)}
// //             />

// //             <div className="flex justify-between">
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={handleAssignDecorator}
// //               >
// //                 Assign
// //               </button>

// //               <button
// //                 className="btn"
// //                 onClick={() => setSelectedBooking(null)}
// //               >
// //                 Close
// //               </button>
// //             </div>

// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManageBookings;



// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// const ManageBookings = () => {
//   const axiosSecure = useAxiosSecure();

//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [decoratorEmail, setDecoratorEmail] = useState("");
//   const [decoratorName, setDecoratorName] = useState("");
//   const [decorators, setDecorators] = useState([]);

//   // Load all bookings
//   const { data: bookings = [], isLoading, refetch } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/bookings");
//       return res.data;
//     },
//   });

//   // Load decorators
//   useEffect(() => {
//     axiosSecure.get("/users/decorators").then(res => setDecorators(res.data));
//   }, []);

//   // Delete booking
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete?")) return;
//     const res = await axiosSecure.delete(`/bookings/${id}`);
//     if (res.data.deletedCount > 0) {
//       toast.success("Booking deleted!");
//       refetch();
//     }
//   };

//   // Update booking status
//   const handleStatusUpdate = async (id, status) => {
//     const res = await axiosSecure.patch(`/bookings/status/${id}`, { status });
//     if (res.data.modifiedCount > 0) {
//       toast.success("Status updated!");
//       refetch();
//     }
//   };

//   // Assign decorator
//   const handleAssignDecorator = async () => {
//     if (!decoratorEmail || !decoratorName) {
//       toast.error("Please select a decorator!");
//       return;
//     }
//     const res = await axiosSecure.patch(`/bookings/assign/${selectedBooking._id}`, {
//       decoratorEmail,
//       decoratorName,
//     });
//     if (res.data.modifiedCount > 0) {
//       toast.success("Decorator Assigned!");
//       refetch();
//       setSelectedBooking(null);
//       setDecoratorEmail("");
//       setDecoratorName("");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Manage All Bookings ({bookings.length})</h2>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead className="bg-gray-200">
//             <tr className="text-center">
//               <th>User</th>
//               <th>Email</th>
//               <th>Service</th>
//               <th>Date</th>
//               <th>Payment</th>
//               <th>Status</th>
//               <th>Decorator</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((book) => (
//               <tr key={book._id} className="text-center border">
//                 <td>{book.userName}</td>
//                 <td>{book.userEmail}</td>
//                 <td>{book.serviceName}</td>
//                 <td>{book.bookingDate}</td>
//                 <td>
//                   {book.paymentStatus === "paid" ? (
//                     <span className="text-green-600 font-bold">PAID</span>
//                   ) : (
//                     <span className="text-red-600 font-bold">UNPAID</span>
//                   )}
//                 </td>
//                 <td>{book.bookingStatus || "pending"}</td>
//                 <td>
//                   {book.decoratorName ? (
//                     <>
//                       <p>{book.decoratorName}</p>
//                       <small className="text-gray-500">{book.decoratorEmail}</small>
//                     </>
//                   ) : (
//                     "Not Assigned"
//                   )}
//                 </td>
//                 <td className="space-y-2">
//                   {book.paymentStatus === "paid" && (
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => setSelectedBooking(book)}
//                     >
//                       Assign
//                     </button>
//                   )}
//                   <button
//                     className="btn btn-sm btn-warning"
//                     onClick={() => handleStatusUpdate(book._id, "confirmed")}
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => handleStatusUpdate(book._id, "completed")}
//                   >
//                     Complete
//                   </button>
//                   <button
//                     className="btn btn-sm btn-error"
//                     onClick={() => handleDelete(book._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Assign Decorator Modal */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h3 className="text-xl font-bold mb-4">Assign Decorator</h3>
//             <select
//               className="input input-bordered w-full mb-4"
//               value={decoratorEmail}
//               onChange={(e) => {
//                 const selected = decorators.find((d) => d.email === e.target.value);
//                 setDecoratorEmail(selected.email);
//                 setDecoratorName(selected.displayName);
//               }}
//             >
//               <option value="">Select a decorator</option>
//               {decorators.map((d) => (
//                 <option key={d._id} value={d.email}>
//                   {d.displayName} ({d.email})
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-between">
//               <button className="btn btn-primary" onClick={handleAssignDecorator}>
//                 Assign
//               </button>
//               <button className="btn" onClick={() => setSelectedBooking(null)}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBookings;





import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [decorators, setDecorators] = useState([]);

  // Load all bookings
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  // Load decorators
  useEffect(() => {
    axiosSecure.get("/users/decorators").then((res) => setDecorators(res.data));
  }, [axiosSecure]);

  // Delete booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    const res = await axiosSecure.delete(`/bookings/${id}`);
    if (res.data.deletedCount > 0) {
      toast.success("Booking deleted!");
      refetch();
    }
  };

  // Update booking status
  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/bookings/status/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      toast.success("Status updated!");
      refetch();
    }
  };

  // Assign decorator by clicking card
  const handleAssignDecorator = async (decorator) => {
    if (!selectedBooking) return;

    const res = await axiosSecure.patch(`/bookings/assign/${selectedBooking._id}`, {
      decoratorEmail: decorator.email,
      decoratorName: decorator.displayName,
    });

    if (res.data.modifiedCount > 0) {
      toast.success(`Decorator ${decorator.displayName} assigned!`);
      refetch();
      setSelectedBooking(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage All Bookings ({bookings.length})</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th>User</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Decorator</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((book) => (
              <tr key={book._id} className="text-center border">
                <td>{book.userName}</td>
                <td>{book.userEmail}</td>
                <td>{book.serviceName}</td>
                <td>{book.bookingDate}</td>
                <td>
                  {book.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-bold">PAID</span>
                  ) : (
                    <span className="text-red-600 font-bold">UNPAID</span>
                  )}
                </td>
                <td>{book.bookingStatus || "pending"}</td>
                <td>
                  {book.decoratorName ? (
                    <>
                      <p>{book.decoratorName}</p>
                      <small className="text-gray-500">{book.decoratorEmail}</small>
                    </>
                  ) : (
                    "Not Assigned"
                  )}
                </td>
                <td className="space-y-2">
                  {book.paymentStatus === "paid" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedBooking(book)}
                    >
                      Assign
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleStatusUpdate(book._id, "confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleStatusUpdate(book._id, "completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------------ ASSIGN DECORATOR MODAL ------------------ */}
     {selectedBooking && (
  <div
    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
    onClick={() => setSelectedBooking(null)}
  >
    <div
      className="bg-white p-6 rounded-2xl shadow-2xl w-11/12 md:w-3/4 max-h-[85vh] overflow-y-auto transform transition-all duration-300 scale-95 md:scale-100"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-2xl font-bold mb-6 text-center">
        Assign Decorator for {selectedBooking.userName}'s Booking
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer border border-transparent hover:border-pink-500"
            onClick={() => handleAssignDecorator(decorator)}
          >
            <div className="w-20 h-20 mb-3">
              <img
                src={decorator.photoURL}
                alt={decorator.displayName}
                className="w-full h-full rounded-full object-cover border-2 border-gray-200"
              />
            </div>
            <p className="font-semibold text-lg text-gray-700">{decorator.displayName}</p>
            <small className="text-gray-400">{decorator.email}</small>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          onClick={() => setSelectedBooking(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ManageBookings;

