// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManageBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [decorators, setDecorators] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Load bookings
//   useEffect(() => {
//     axios.get("http://localhost:3000/bookings").then((res) => setBookings(res.data));
//   }, []);

//   // Open modal and load decorators
//   const openDecoratorModal = async (booking) => {
//     setSelectedBooking(booking);
//     const res = await axios.get("http://localhost:3000/users/decorators/active");
//     setDecorators(res.data);
//     setShowModal(true);
//   };

//   // Assign decorator
//   const assignDecorator = async (decoratorId) => {
//     if (!selectedBooking) return;
//     try {
//       await axios.patch(
//         `http://localhost:3000/bookings/${selectedBooking._id}/assign-decorator`,
//         { decoratorId }
//       );

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
//                 assignedDecoatorStatus:'assigned',
//                 decoratorAssigned: true,
//               }
//             : b
//         )
//       );

//       setShowModal(false);
//       alert("Decorator assigned successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to assign decorator");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

//       <table className="table-auto w-full border shadow-md rounded">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="px-3 py-2 border">User</th>
//             <th className="px-3 py-2 border">Service</th>
//             <th className="px-3 py-2 border">Type</th>
//             <th className="px-3 py-2 border">Booking Date</th>
//             <th className="px-3 py-2 border">Location</th>
//             <th className="px-3 py-2 border">Payment</th>
//             <th className="px-3 py-2 border">Decorator</th>
//             <th className="px-3 py-2 border">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bookings.map((booking) => {
//             const isInStudio = booking.serviceType === "in-studio";
//             const isPaid = booking.paymentStatus === "paid";

//             return (
//               <tr key={booking._id} className="hover:bg-gray-50">
//                 <td className="border px-3 py-2">{booking.userName}</td>
//                 <td className="border px-3 py-2">{booking.serviceName}</td>

//                 <td className="border px-3 py-2 font-semibold">
//                   {booking.serviceType}
//                 </td>

//                 <td className="border px-3 py-2">{booking.bookingDate}</td>
//                 <td className="border px-3 py-2">{booking.location}</td>

//                 <td className="border px-3 py-2">
//                  <span
//                    className={
//                      booking.paymentStatus === "paid"
//                        ? "bg-green-200 text-green-900 px-2 py-1 rounded"
//                        : "bg-red-200 text-red-900 px-2 py-1 rounded"
//                    }
//                   >
//                     {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
//                   </span>
//                 </td>

//                 <td className="border px-3 py-2">
//                   {booking.decoratorAssigned ? (
//                     <span className="text-green-700 font-semibold">
//                       Assigned ({booking.assignedDecoratorName})
//                     </span>
//                   ) : (
//                     <span className="text-red-500">Not Assigned</span>
//                   )}
//                 </td>

//                 <td className="border px-3 py-2">
//                   {/* FULL LOGIC */}
//                   {isInStudio ? (
//                     <button
//                       disabled
//                       className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
//                     >
//                       Assign Decorator
//                     </button>
//                   ) : !isPaid ? (
//                     <button
//                       disabled
//                       className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
//                     >
//                       Assign Decorator
//                     </button>
//                   ) : booking.decoratorAssigned ? (
//                     <span className="text-green-700 font-semibold">Assigned</span>
//                   ) : (
//                     <button
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                       onClick={() => openDecoratorModal(booking)}
//                     >
//                       Assign Decorator
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto shadow-lg">
//             <h2 className="text-xl font-bold mb-4">
//               Select Decorator for {selectedBooking.serviceName}
//             </h2>

//             <div className="grid grid-cols-3 gap-4">
//               {decorators.map((d) => (
//                 <div
//                   key={d._id}
//                   className="border p-4 rounded shadow hover:shadow-xl cursor-pointer"
//                   onClick={() => assignDecorator(d._id)}
//                 >
//                   <h3 className="font-semibold text-lg">{d.name}</h3>
//                   <p className="text-sm">{d.email}</p>
//                   <p className="text-sm italic text-gray-600">{d.specialty}</p>
//                 </div>
//               ))}
//             </div>

//             <button
//               className="mt-4 bg-gray-500 text-white px-4 py-1 rounded"
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
//       alert("Decorator assigned successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to assign decorator");
//     }
//   };

//   // Summary stats
//   const totalBookings = bookings.length;
//   const inStudioCount = bookings.filter((b) => b.serviceType === "in-studio").length;
//   const onSiteCount = bookings.filter((b) => b.serviceType !== "in-studio").length;
//   const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
//   const assignedCount = bookings.filter((b) => b.decoratorAssigned).length;

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-10 ">
//         <div className="card bg-blue-100 text-blue-800 shadow">
//           <div className="card-body text-center">
//             <h2 className="md:text-2xl text-xl font-bold">Total Bookings</h2>
//             <p className="text-2xl font-bold">{totalBookings}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center">
//             <h2 className="md:text-2xl text-xl font-bold">On-site</h2>
//             <p className="text-2xl font-bold">{onSiteCount}</p>
//           </div>
//         </div>
//         <div className="card bg-yellow-100 text-yellow-800 shadow">
//           <div className="card-body text-center">
//             <h2 className="md:text-2xl text-xl font-bold">In-studio</h2>
//             <p className="text-2xl font-bold">{inStudioCount}</p>
//           </div>
//         </div>
//         <div className="card bg-purple-100 text-purple-800 shadow">
//           <div className="card-body text-center">
//             <h2 className="md:text-2xl text-xl font-bold">Paid</h2>
//             <p className="text-2xl font-bold">{paidCount}</p>
//           </div>
//         </div>
//         <div className="card bg-green-100 text-green-800 shadow">
//           <div className="card-body text-center">
//             <h2 className="md:text-2xl text-xl font-bold">Assigned</h2>
//             <p className="text-2xl font-bold">{assignedCount}</p>
//           </div>
//         </div>
//       </div>

//       {/* DaisyUI Table */}
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User</th>
//               <th>Service</th>
//               <th>Type</th>
//               <th>Date</th>
//               <th>Location</th>
//               <th>Payment</th>
//               <th>Decorator</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking,index) => {
//               const isInStudio = booking.serviceType === "in-studio";
//               const isPaid = booking.paymentStatus === "paid";

//               return (
//                 <tr key={booking._id}>
//                   <td>{index+1}</td>
//                   <td className="text-gray-500 font-bold">{booking.userName}</td>
//                   <td><span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold">{booking.serviceName}</span></td>
//                   <td className="text-sky-600"><span className="bg-sky-200 px-2 py-1 rounded-full font-bold">{booking.serviceType}</span></td>
//                   <td className="text-gray-500 font-bold">{booking.bookingDate}</td>
//                   <td><span className="text-yellow-500 bg-yellow-50 font-bold px-2 py-1 rounded-full" >{booking.location}</span></td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         isPaid ? "badge-success rounded-full font-semibold" : "badge-error rounded-full font-semibold"
//                       }`}
//                     >
//                       {isPaid ? "Paid" : "Unpaid"}
//                     </span>
//                   </td>
//                   <td>
//                     {booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-bold  px-2 py-1 ">
//                         {booking.assignedDecoratorName}
//                       </span>
//                     ) : (
//                       <span className="text-red-600  px-2 py-1 font-bold">Not Assigned</span>
//                     )}
//                   </td>
//                   <td>
//                     {isInStudio || !isPaid ? (
//                       <button className="btn btn-disabled btn-sm flex items-center rounded-full"><BsPersonFillAdd /> Assign</button>
//                     ) : booking.decoratorAssigned ? (
//                       <span className="text-green-700 font-semibold bg-green-200 px-2 py-1 rounded-full">Assigned</span>
//                     ) : (
//                       <button
//                         className="btn btn-primary btn-sm rounded-full"
//                         onClick={() => openDecoratorModal(booking)}
//                       ><BsPersonFillAdd />
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
//      {showModal && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity p-4 sm:p-6">
//     <div className="bg-white rounded-3xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 border border-gray-100 animate-fadeIn">
//       {/* Header */}
//       <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-900">
//         Select Decorator for <span className="text-[#005461]">{selectedBooking.serviceName}</span>
//       </h2>

//       {/* Decorators Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//         {decorators.map((d) => (
//           <div
//             key={d._id}
//             className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
//             onClick={() => assignDecorator(d._id)}
//           >
//             {/* Optional: subtle top accent */}
//             <div className="h-1 bg-gradient-to-r from-[#005461] to-[#008080] rounded-t-xl"></div>

//             <div className="p-4 sm:p-5">
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{d.name}</h3>
//               <p className="text-xs sm:text-sm text-gray-500 mb-1">{d.email}</p>
//               <p className="text-xs sm:text-sm italic text-gray-400">{d.specialty}</p>
//             </div>

//             {/* Hover overlay effect */}
//             <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//           </div>
//         ))}
//       </div>

//       {/* Close Button */}
//       <button
//         className="mt-6 w-full bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300"
//         onClick={() => setShowModal(false)}
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}



//     </div>
//   );
// };

// export default ManageBookings;
import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { BsPersonFillAdd } from "react-icons/bs";
import toast from "react-hot-toast";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load bookings
  useEffect(() => {
    axiosSecure.get("/bookings").then((res) => setBookings(res.data));
  }, [axiosSecure]);
//   useEffect(() => {
//   axiosSecure.get("/bookings/all").then((res) => setBookings(res.data));
// }, [axiosSecure]);

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
      await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`,{ decoratorId } );

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

  // Summary stats
  const totalBookings = bookings.length;
  const inStudioCount = bookings.filter((b) => b.serviceType === "in-studio").length;
  const onSiteCount = bookings.filter((b) => b.serviceType !== "in-studio").length;
  const paidCount = bookings.filter((b) => b.paymentStatus === "paid").length;
  const assignedCount = bookings.filter((b) => b.decoratorAssigned).length;

  return (
    <div className="px-2 sm:px-4 lg:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-[#FAB12F] mt-5 text-center">Manage Bookings</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5 mb-6 sm:mb-10">
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
            {bookings.map((booking, index) => {
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
            })}
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