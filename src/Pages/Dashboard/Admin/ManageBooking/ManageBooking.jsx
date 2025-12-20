// import React, { useState, useEffect } from "react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { BsPersonFillAdd } from "react-icons/bs";
// import toast from "react-hot-toast";

// const ManageBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [bookings, setBookings] = useState([]);
//   const [decorators, setDecorators] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Load bookings
//   useEffect(() => {
//     axiosSecure.get("/bookings").then((res) => setBookings(res.data));
//   }, [axiosSecure]);
// //   useEffect(() => {
// //   axiosSecure.get("/bookings/all").then((res) => setBookings(res.data));
// // }, [axiosSecure]);

//   // Open modal and load decorators
//   const openDecoratorModal = async (booking) => {
//     setSelectedBooking(booking);
//     const res = await axiosSecure.get("/users/decorators/active");
//     setDecorators(res.data);
//     setShowModal(true);
//   };

//   // Assign decorator
//   const assignDecorator = async (decoratorId) => {
//     if (!selectedBooking) return;
//     try {
//       await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`,{ decoratorId } );

//       const decorator = decorators.find((d) => d._id === decoratorId);

//       setBookings(
//         bookings.map((b) =>
//           b._id === selectedBooking._id
//             ? {
//                 ...b,
//                 assignedDecoratorId: decorator._id,
//                 assignedDecoratorName: decorator.name,
//                 assignedDecoratorEmail: decorator.email,
//                 assignedDecoratorSpecialty: decorator.specialty,
//                 assignedDecoatorStatus: "assigned",
//                 decoratorAssigned: true,
//               }
//             : b
//         )
//       );

//       setShowModal(false);
//       toast.success("Decorator assigned successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to assign decorator");
//     }
//   };

//   // Summary stats
//   const totalBookings = bookings.length;
//   const inStudioCount = bookings.filter((b) => b.serviceType === "in-studio").length;
//   const onSiteCount = bookings.filter((b) => b.serviceType !== "in-studio").length;
//   const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
//   const assignedCount = bookings.filter((b) => b.decoratorAssigned).length;

//   return (
//     <div className="px-2 sm:px-4 lg:px-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6 sm:mb-10">
//         <div className="card bg-blue-100 text-blue-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Total Bookings</h2>
//             <p className="text-xl sm:text-2xl font-bold">{totalBookings}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">On-site</h2>
//             <p className="text-xl sm:text-2xl font-bold">{onSiteCount}</p>
//           </div>
//         </div>
//         <div className="card bg-yellow-100 text-yellow-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">In-studio</h2>
//             <p className="text-xl sm:text-2xl font-bold">{inStudioCount}</p>
//           </div>
//         </div>
//         <div className="card bg-purple-100 text-purple-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Paid</h2>
//             <p className="text-xl sm:text-2xl font-bold">{paidCount}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Assigned</h2>
//             <p className="text-xl sm:text-2xl font-bold">{assignedCount}</p>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#007b91] text-white">
//             <tr>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">#</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">User</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Service</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Type</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Date</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Location</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Payment</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Decorator</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {bookings.map((booking, index) => {
//               const isInStudio = booking.serviceType === "in-studio";
//               const isPaid = booking.paymentStatus === "paid";

//               return (
//                 <tr key={booking._id} className="hover:bg-gray-50 transition">
//                   <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
//                   <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.userName}</td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       {booking.serviceName}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="bg-sky-200 text-sky-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       {booking.serviceType}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.bookingDate}</td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="text-yellow-500 bg-yellow-50 font-bold px-2 py-1 rounded-full text-xs sm:text-sm">
//                       {booking.location}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span
//                       className={`badge text-xs sm:text-sm ${
//                         isPaid ? "badge-success rounded-full font-semibold" : "badge-error rounded-full font-semibold"
//                       }`}
//                     >
//                       {isPaid ? "Paid" : "Unpaid"}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     {booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-bold px-2 py-1 text-xs sm:text-sm">
//                         {booking.assignedDecoratorName}
//                       </span>
//                     ) : (
//                       <span className="text-red-600 px-2 py-1 font-bold text-xs sm:text-sm">Not Assigned</span>
//                     )}
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     {isInStudio || !isPaid ? (
//                       <button className="btn btn-disabled btn-sm flex items-center gap-1 rounded-full text-xs">
//                         <BsPersonFillAdd /> Assign
//                       </button>
//                     ) : booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded-full text-xs sm:text-sm">Assigned</span>
//                     ) : (
//                       <button
//                         className="btn btn-primary btn-sm rounded-full flex items-center gap-1 text-xs"
//                         onClick={() => openDecoratorModal(booking)}
//                       >
//                         <BsPersonFillAdd />
//                         Assign
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Decorator Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6">
//           <div className="bg-white rounded-3xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 animate-fadeIn">
//             {/* Header */}
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-gray-900">
//               Select Decorator for <span className="text-[#005461]">{selectedBooking.serviceName}</span>
//             </h2>

//             {/* Decorators Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//               {decorators.map((d) => (
//                 <div
//                   key={d._id}
//                   className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
//                   onClick={() => assignDecorator(d._id)}
//                 >
//                   {/* Optional: subtle top accent */}
//                   <div className="h-1 bg-gradient-to-r from-[#005461] to-[#008080] rounded-t-xl"></div>

//                   <div className="p-3 sm:p-4 md:p-5">
//                     <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">{d.name}</h3>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{d.email}</p>
//                     <p className="text-xs sm:text-sm italic text-gray-400">{d.specialty}</p>
//                   </div>

//                   {/* Hover overlay effect */}
//                   <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//                 </div>
//               ))}
//             </div>

//             {/* Close Button */}
//             <button
//               className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white font-bold py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBookings;


// import React, { useState, useEffect } from "react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { BsPersonFillAdd } from "react-icons/bs";
// import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ManageBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [bookings, setBookings] = useState([]);
//   const [decorators, setDecorators] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   // Sort states
//   const [dateSortOrder, setDateSortOrder] = useState(null); // 'asc' | 'desc' | null
//   const [paymentSortOrder, setPaymentSortOrder] = useState(null); // 'asc' | 'desc' | null

//   // Load bookings with transaction query
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axiosSecure.get("/bookings", {
//           params: {
//             transaction: true // Add transaction parameter
//           }
//         });
//         setBookings(res.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         toast.error("Failed to load bookings");
//       }
//     };
    
//     fetchBookings();
//   }, [axiosSecure]);

//   // Open modal and load decorators
//   const openDecoratorModal = async (booking) => {
//     setSelectedBooking(booking);
//     const res = await axiosSecure.get("/users/decorators/active");
//     setDecorators(res.data);
//     setShowModal(true);
//   };

//   // Assign decorator
//   const assignDecorator = async (decoratorId) => {
//     if (!selectedBooking) return;
//     try {
//       await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`, { decoratorId });

//       const decorator = decorators.find((d) => d._id === decoratorId);

//       setBookings(
//         bookings.map((b) =>
//           b._id === selectedBooking._id
//             ? {
//                 ...b,
//                 assignedDecoratorId: decorator._id,
//                 assignedDecoratorName: decorator.name,
//                 assignedDecoratorEmail: decorator.email,
//                 assignedDecoratorSpecialty: decorator.specialty,
//                 assignedDecoatorStatus: "assigned",
//                 decoratorAssigned: true,
//               }
//             : b
//         )
//       );

//       setShowModal(false);
//       toast.success("Decorator assigned successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to assign decorator");
//     }
//   };

//   // Sort by date
//   const sortByDate = () => {
//     let newOrder;
//     if (dateSortOrder === null || dateSortOrder === 'desc') {
//       newOrder = 'asc';
//     } else {
//       newOrder = 'desc';
//     }
    
//     setDateSortOrder(newOrder);
//     setPaymentSortOrder(null); // Reset payment sort
    
//     const sorted = [...bookings].sort((a, b) => {
//       const dateA = new Date(a.bookingDate);
//       const dateB = new Date(b.bookingDate);
//       return newOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     });
    
//     setBookings(sorted);
//   };

//   // Sort by payment status
//   const sortByPayment = () => {
//     let newOrder;
//     if (paymentSortOrder === null || paymentSortOrder === 'desc') {
//       newOrder = 'asc';
//     } else {
//       newOrder = 'desc';
//     }
    
//     setPaymentSortOrder(newOrder);
//     setDateSortOrder(null); // Reset date sort
    
//     const sorted = [...bookings].sort((a, b) => {
//       const statusOrder = { 'paid': 1, 'unpaid': 0 };
//       const statusA = statusOrder[a.paymentStatus] || 0;
//       const statusB = statusOrder[b.paymentStatus] || 0;
//       return newOrder === 'asc' ? statusA - statusB : statusB - statusA;
//     });
    
//     setBookings(sorted);
//   };

//   // Summary stats
//   const totalBookings = bookings.length;
//   const inStudioCount = bookings.filter((b) => b.serviceType === "in-studio").length;
//   const onSiteCount = bookings.filter((b) => b.serviceType !== "in-studio").length;
//   const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
//   const assignedCount = bookings.filter((b) => b.decoratorAssigned).length;

//   return (
//     <div className="px-2 sm:px-4 lg:px-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6 sm:mb-10">
//         <div className="card bg-blue-100 text-blue-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Total Bookings</h2>
//             <p className="text-xl sm:text-2xl font-bold">{totalBookings}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">On-site</h2>
//             <p className="text-xl sm:text-2xl font-bold">{onSiteCount}</p>
//           </div>
//         </div>
//         <div className="card bg-yellow-100 text-yellow-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">In-studio</h2>
//             <p className="text-xl sm:text-2xl font-bold">{inStudioCount}</p>
//           </div>
//         </div>
//         <div className="card bg-purple-100 text-purple-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Paid</h2>
//             <p className="text-xl sm:text-2xl font-bold">{paidCount}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Assigned</h2>
//             <p className="text-xl sm:text-2xl font-bold">{assignedCount}</p>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#007b91] text-white">
//             <tr>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">#</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">User</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Service</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Type</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">
//                 <button 
//                   onClick={sortByDate}
//                   className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
//                 >
//                   Date
//                   {dateSortOrder === 'asc' ? <FaSortAmountUp /> : dateSortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountDown className="opacity-50" />}
//                 </button>
//               </th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Location</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">
//                 <button 
//                   onClick={sortByPayment}
//                   className="flex items-center gap-1 hover:text-yellow-300 transition-colors"
//                 >
//                   Payment
//                   {paymentSortOrder === 'asc' ? <FaSortAmountUp /> : paymentSortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountDown className="opacity-50" />}
//                 </button>
//               </th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Decorator</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {bookings.map((booking, index) => {
//               const isInStudio = booking.serviceType === "in-studio";
//               const isPaid = booking.paymentStatus === "paid";

//               return (
//                 <tr key={booking._id} className="hover:bg-gray-50 transition">
//                   <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
//                   <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.userName}</td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       {booking.serviceName}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="bg-sky-200 text-sky-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                       {booking.serviceType}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.bookingDate}</td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span className="text-yellow-500 bg-yellow-50 font-bold px-2 py-1 rounded-full text-xs sm:text-sm">
//                       {booking.location}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     <span
//                       className={`badge text-xs sm:text-sm ${
//                         isPaid ? "badge-success rounded-full font-semibold" : "badge-error rounded-full font-semibold"
//                       }`}
//                     >
//                       {isPaid ? "Paid" : "Unpaid"}
//                     </span>
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     {booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-bold px-2 py-1 text-xs sm:text-sm">
//                         {booking.assignedDecoratorName}
//                       </span>
//                     ) : (
//                       <span className="text-red-600 px-2 py-1 font-bold text-xs sm:text-sm">Not Assigned</span>
//                     )}
//                   </td>
//                   <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                     {isInStudio || !isPaid ? (
//                       <button className="btn btn-disabled btn-sm flex items-center gap-1 rounded-full text-xs">
//                         <BsPersonFillAdd /> Assign
//                       </button>
//                     ) : booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded-full text-xs sm:text-sm">Assigned</span>
//                     ) : (
//                       <button
//                         className="btn btn-primary btn-sm rounded-full flex items-center gap-1 text-xs"
//                         onClick={() => openDecoratorModal(booking)}
//                       >
//                         <BsPersonFillAdd />
//                         Assign
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Decorator Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6">
//           <div className="bg-white rounded-3xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 animate-fadeIn">
//             {/* Header */}
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-gray-900">
//               Select Decorator for <span className="text-[#005461]">{selectedBooking.serviceName}</span>
//             </h2>

//             {/* Decorators Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//               {decorators.map((d) => (
//                 <div
//                   key={d._id}
//                   className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
//                   onClick={() => assignDecorator(d._id)}
//                 >
//                   {/* Optional: subtle top accent */}
//                   <div className="h-1 bg-gradient-to-r from-[#005461] to-[#008080] rounded-t-xl"></div>

//                   <div className="p-3 sm:p-4 md:p-5">
//                     <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">{d.name}</h3>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{d.email}</p>
//                     <p className="text-xs sm:text-sm italic text-gray-400">{d.specialty}</p>
//                   </div>

//                   {/* Hover overlay effect */}
//                   <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//                 </div>
//               ))}
//             </div>

//             {/* Close Button */}
//             <button
//               className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white font-bold py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBookings;


// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { BsPersonFillAdd } from "react-icons/bs";
// import { FaSearch } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ManageBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [decorators, setDecorators] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("all");

//   // Fetch bookings using TanStack Query
//   const { data: bookings = [], isLoading, refetch } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/bookings/all");
//       return res.data;
//     },
//   });

//   // Open modal and load decorators
//   const openDecoratorModal = async (booking) => {
//     setSelectedBooking(booking);
//     const res = await axiosSecure.get("/users/decorators/active");
//     setDecorators(res.data);
//     setShowModal(true);
//   };

//   // Assign decorator
//   const assignDecorator = async (decoratorId) => {
//     if (!selectedBooking) return;
//     try {
//       await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`, { decoratorId });
      
//       refetch(); // Refetch bookings after assignment
//       setShowModal(false);
//       toast.success("Decorator assigned successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to assign decorator");
//     }
//   };

//   // Filter bookings based on search and filters
//   const filteredBookings = bookings.filter((booking) => {
//     const matchesSearch = 
//       booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       booking.assignedDecoratorName?.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesDate = dateFilter === "" || booking.bookingDate === dateFilter;
    
//     const matchesPayment = 
//       paymentFilter === "all" || 
//       booking.paymentStatus === paymentFilter;
    
//     return matchesSearch && matchesDate && matchesPayment;
//   });

//   // Summary stats
//   const totalBookings = filteredBookings.length;
//   const inStudioCount = filteredBookings.filter((b) => b.serviceType === "in-studio").length;
//   const onSiteCount = filteredBookings.filter((b) => b.serviceType !== "in-studio").length;
//   const paidCount = filteredBookings.filter((b) => b.paymentStatus === "paid").length;
//   const assignedCount = filteredBookings.filter((b) => b.decoratorAssigned).length;

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg text-[#007b91]"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="px-2 sm:px-4 lg:px-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6">
//         <div className="card bg-blue-100 text-blue-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Total Bookings</h2>
//             <p className="text-xl sm:text-2xl font-bold">{totalBookings}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">On-site</h2>
//             <p className="text-xl sm:text-2xl font-bold">{onSiteCount}</p>
//           </div>
//         </div>
//         <div className="card bg-yellow-100 text-yellow-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">In-studio</h2>
//             <p className="text-xl sm:text-2xl font-bold">{inStudioCount}</p>
//           </div>
//         </div>
//         <div className="card bg-purple-100 text-purple-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Paid</h2>
//             <p className="text-xl sm:text-2xl font-bold">{paidCount}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center p-3 sm:p-4">
//             <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Assigned</h2>
//             <p className="text-xl sm:text-2xl font-bold">{assignedCount}</p>
//           </div>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {/* Search Input */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">Search</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by name, service, location..."
//                 className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#007b91]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>

//           {/* Date Filter */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">Filter by Date</span>
//             </label>
//             <input
//               type="date"
//               className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#007b91]"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//             />
//           </div>

//           {/* Payment Status Filter */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">Payment Status</span>
//             </label>
//             <select
//               className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#007b91]"
//               value={paymentFilter}
//               onChange={(e) => setPaymentFilter(e.target.value)}
//             >
//               <option value="all">All Payments</option>
//               <option value="paid">Paid Only</option>
//               <option value="unpaid">Unpaid Only</option>
//             </select>
//           </div>
//         </div>

//         {/* Clear Filters Button */}
//         {(searchTerm || dateFilter || paymentFilter !== "all") && (
//           <div className="mt-4 text-center">
//             <button
//               className="btn btn-outline btn-sm"
//               onClick={() => {
//                 setSearchTerm("");
//                 setDateFilter("");
//                 setPaymentFilter("all");
//               }}
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#007b91] text-white">
//             <tr>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">#</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">User</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Service</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Type</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Date</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Location</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Payment</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Decorator</th>
//               <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filteredBookings.length === 0 ? (
//               <tr>
//                 <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
//                   No bookings found matching your filters
//                 </td>
//               </tr>
//             ) : (
//               filteredBookings.map((booking, index) => {
//                 const isInStudio = booking.serviceType === "in-studio";
//                 const isPaid = booking.paymentStatus === "paid";

//                 return (
//                   <tr key={booking._id} className="hover:bg-gray-50 transition">
//                     <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
//                     <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.userName}</td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                         {booking.serviceName}
//                       </span>
//                     </td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       <span className="bg-sky-200 text-sky-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
//                         {booking.serviceType}
//                       </span>
//                     </td>
//                     <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.bookingDate}</td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       <span className="text-yellow-500 bg-yellow-50 font-bold px-2 py-1 rounded-full text-xs sm:text-sm">
//                         {booking.location}
//                       </span>
//                     </td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       <span
//                         className={`badge text-xs sm:text-sm ${
//                           isPaid ? "badge-success rounded-full font-semibold" : "badge-error rounded-full font-semibold"
//                         }`}
//                       >
//                         {isPaid ? "Paid" : "Unpaid"}
//                       </span>
//                     </td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       {booking.decoratorAssigned ? (
//                         <span className="text-green-700 font-bold px-2 py-1 text-xs sm:text-sm">
//                           {booking.assignedDecoratorName}
//                         </span>
//                       ) : (
//                         <span className="text-red-600 px-2 py-1 font-bold text-xs sm:text-sm">Not Assigned</span>
//                       )}
//                     </td>
//                     <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
//                       {isInStudio || !isPaid ? (
//                         <button className="btn btn-disabled btn-sm flex items-center gap-1 rounded-full text-xs">
//                           <BsPersonFillAdd /> Assign
//                         </button>
//                       ) : booking.decoratorAssigned ? (
//                         <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded-full text-xs sm:text-sm">Assigned</span>
//                       ) : (
//                         <button
//                           className="btn btn-primary btn-sm rounded-full flex items-center gap-1 text-xs"
//                           onClick={() => openDecoratorModal(booking)}
//                         >
//                           <BsPersonFillAdd />
//                           Assign
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Decorator Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6">
//           <div className="bg-white rounded-3xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 animate-fadeIn">
//             {/* Header */}
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-gray-900">
//               Select Decorator for <span className="text-[#005461]">{selectedBooking.serviceName}</span>
//             </h2>

//             {/* Decorators Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//               {decorators.map((d) => (
//                 <div
//                   key={d._id}
//                   className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
//                   onClick={() => assignDecorator(d._id)}
//                 >
//                   {/* Optional: subtle top accent */}
//                   <div className="h-1 bg-gradient-to-r from-[#005461] to-[#008080] rounded-t-xl"></div>

//                   <div className="p-3 sm:p-4 md:p-5">
//                     <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">{d.name}</h3>
//                     <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{d.email}</p>
//                     <p className="text-xs sm:text-sm italic text-gray-400">{d.specialty}</p>
//                   </div>

//                   {/* Hover overlay effect */}
//                   <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//                 </div>
//               ))}
//             </div>

//             {/* Close Button */}
//             <button
//               className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white font-bold py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
//               onClick={() => setShowModal(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBookings;

import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../../../../Component/Loading/Loading";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter and Sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [paymentSort, setPaymentSort] = useState("");

  // Load bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const res = await axiosSecure.get("/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [axiosSecure]);

  // Open modal and load decorators
  const openDecoratorModal = async (booking) => {
    setSelectedBooking(booking);
    const res = await axiosSecure.get("/users/decorators/active");
    setDecorators(res.data);
    setShowModal(true);
  };

  // Assign decorator
  const assignDecorator = async (decoratorId) => {
    if (!selectedBooking) return;
    try {
      await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`, { decoratorId });

      const decorator = decorators.find((d) => d._id === decoratorId);

      setBookings(
        bookings.map((b) =>
          b._id === selectedBooking._id
            ? {
                ...b,
                assignedDecoratorId: decorator._id,
                assignedDecoratorName: decorator.name,
                assignedDecoratorEmail: decorator.email,
                assignedDecoratorSpecialty: decorator.specialty,
                assignedDecoatorStatus: "assigned",
                decoratorAssigned: true,
              }
            : b
        )
      );

      setShowModal(false);
      toast.success("Decorator assigned successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign decorator");
    }
  };

  // Filter and sort bookings
  const getProcessedBookings = () => {
    let result = [...bookings];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((booking) =>
        booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.assignedDecoratorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date sort
    if (dateSort === "asc") {
      result.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
    } else if (dateSort === "desc") {
      result.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    }

    // Apply payment sort
    if (paymentSort === "paid-first") {
      result.sort((a, b) => {
        const isPaidA = a.paymentStatus === "paid" ? 1 : 0;
        const isPaidB = b.paymentStatus === "paid" ? 1 : 0;
        return isPaidB - isPaidA;
      });
    } else if (paymentSort === "unpaid-first") {
      result.sort((a, b) => {
        const isPaidA = a.paymentStatus === "paid" ? 1 : 0;
        const isPaidB = b.paymentStatus === "paid" ? 1 : 0;
        return isPaidA - isPaidB;
      });
    }

    return result;
  };

  const processedBookings = getProcessedBookings();

  // Summary stats
  const totalBookings = processedBookings.length;
  const inStudioCount = processedBookings.filter((b) => b.serviceType === "in-studio").length;
  const onSiteCount = processedBookings.filter((b) => b.serviceType !== "in-studio").length;
  const paidCount = processedBookings.filter((b) => b.paymentStatus === "paid").length;
  const assignedCount = processedBookings.filter((b) => b.decoratorAssigned).length;

  if (isLoading) return <Loading></Loading>

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6">
        <div className="card bg-blue-100 text-blue-800 shadow">
          <div className="card-body text-center p-3 sm:p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Total Bookings</h2>
            <p className="text-xl sm:text-2xl font-bold">{totalBookings}</p>
          </div>
        </div>
        <div className="card bg-green-100 text-green-800 shadow">
          <div className="card-body text-center p-3 sm:p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">On-site</h2>
            <p className="text-xl sm:text-2xl font-bold">{onSiteCount}</p>
          </div>
        </div>
        <div className="card bg-yellow-100 text-yellow-800 shadow">
          <div className="card-body text-center p-3 sm:p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">In-studio</h2>
            <p className="text-xl sm:text-2xl font-bold">{inStudioCount}</p>
          </div>
        </div>
        <div className="card bg-purple-100 text-purple-800 shadow">
          <div className="card-body text-center p-3 sm:p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Paid</h2>
            <p className="text-xl sm:text-2xl font-bold">{paidCount}</p>
          </div>
        </div>
        <div className="card bg-green-100 text-green-800 shadow">
          <div className="card-body text-center p-3 sm:p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold whitespace-nowrap">Assigned</h2>
            <p className="text-xl sm:text-2xl font-bold">{assignedCount}</p>
          </div>
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className=" rounded-xl shadow-lg p-4 sm:p-6 mb-6 bg-[#005461]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text  text-white font-bold">Search</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, service, location..."
                className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-[#007b91] rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Date Sort */}
          <div className="form-control">
            <label className="label ">
              <span className="label-text text-white font-bold">Sort by Date</span>
            </label>
            <select
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#007b91] rounded-lg"
              value={dateSort}
              onChange={(e) => setDateSort(e.target.value)}
            >
              <option value="">No Sorting</option>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
          </div>

          {/* Payment Sort */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-bold">Sort by Payment</span>
            </label>
            <select
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#007b91] rounded-lg"
              value={paymentSort}
              onChange={(e) => setPaymentSort(e.target.value)}
            >
              <option value="">No Sorting</option>
              <option value="paid-first">Paid First</option>
              <option value="unpaid-first">Unpaid First</option>
            </select>
          </div>
        </div>

        {/* Clear Button */}
        {(searchTerm || dateSort || paymentSort) && (
          <div className="mt-4 text-center ">
            <button
              className=" bg-[#FAB12F] px-3 py-1 rounded-lg text-white font-bold hover:bg-white hover:text-[#005461] "
              onClick={() => {
                setSearchTerm("");
                setDateSort("");
                setPaymentSort("");
              }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#007b91] text-white">
            <tr>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">#</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">User</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Service</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Type</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Date</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Location</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Payment</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Decorator</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {processedBookings.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              processedBookings.map((booking, index) => {
                const isInStudio = booking.serviceType === "in-studio";
                const isPaid = booking.paymentStatus === "paid";

                return (
                  <tr key={booking._id} className="hover:bg-gray-50 transition">
                    <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
                    <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.userName}</td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
                        {booking.serviceName}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      <span className="bg-sky-200 text-sky-600 px-2 py-1 rounded-full font-bold text-xs sm:text-sm">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-gray-500 font-bold text-xs sm:text-sm whitespace-nowrap">{booking.bookingDate}</td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      <span className="text-yellow-500 bg-yellow-50 font-bold px-2 py-1 rounded-full text-xs sm:text-sm">
                        {booking.location}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      <span
                        className={`badge text-xs sm:text-sm ${
                          isPaid ? "badge-success rounded-full font-semibold" : "badge-error rounded-full font-semibold"
                        }`}
                      >
                        {isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      {booking.decoratorAssigned ? (
                        <span className="text-green-700 font-bold px-2 py-1 text-xs sm:text-sm">
                          {booking.assignedDecoratorName}
                        </span>
                      ) : (
                        <span className="text-red-600 px-2 py-1 font-bold text-xs sm:text-sm">Not Assigned</span>
                      )}
                    </td>
                    <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                      {isInStudio || !isPaid ? (
                        <button className="btn btn-disabled btn-sm flex items-center gap-1 rounded-full text-xs">
                          <BsPersonFillAdd /> Assign
                        </button>
                      ) : booking.decoratorAssigned ? (
                        <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded-full text-xs sm:text-sm">Assigned</span>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm rounded-full flex items-center gap-1 text-xs"
                          onClick={() => openDecoratorModal(booking)}
                        >
                          <BsPersonFillAdd />
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Decorator Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6">
          <div className="bg-white rounded-3xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 animate-fadeIn">
            {/* Header */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-gray-900">
              Select Decorator for <span className="text-[#005461]">{selectedBooking.serviceName}</span>
            </h2>

            {/* Decorators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {decorators.map((d) => (
                <div
                  key={d._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
                  onClick={() => assignDecorator(d._id)}
                >
                  {/* Optional: subtle top accent */}
                  <div className="h-1 bg-gradient-to-r from-[#005461] to-[#008080] rounded-t-xl"></div>

                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">{d.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">{d.email}</p>
                    <p className="text-xs sm:text-sm italic text-gray-400">{d.specialty}</p>
                  </div>

                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white font-bold py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;