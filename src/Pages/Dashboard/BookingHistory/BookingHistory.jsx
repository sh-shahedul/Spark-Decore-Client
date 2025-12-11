// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAuth from '../../../hooks/useAuth';
// import { Link } from 'react-router';
// import { FaEdit } from 'react-icons/fa';
// import { BsFillTrash3Fill } from "react-icons/bs";
// import Swal from 'sweetalert2';


// const BookingHistory = () => {
//     const axiosSecure =useAxiosSecure()
//     const{user} = useAuth()
//   // Fetch bookings using React Query
//   const { refetch,data: bookings = [], isLoading, isError } = useQuery({
//     queryKey: ['bookings'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings?email=${user.email}`); 
//       console.log(res.data)
//       return res.data;
//     },
//   });

//    const handelBookingDelete =(id)=>{
//         // console.log(id)
//         Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!"
// }).then((result) => {
//   if (result.isConfirmed) {

//      axiosSecure.delete(`/bookings/${id}`)
//      .then(res=>{
//         console.log(res.data)
//         if(res.data.deletedCount){
//             refetch()
//           Swal.fire({
//            title: "Deleted!",
//            text: "Your file has been deleted.",
//            icon: "success"
//          });
//         }
//      })



    
//   }
// });
//    }



//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Something went wrong!</p>;

//   return (

//     <div className="p-6">
        
//       <h1 className="text-2xl font-bold mb-4">Booking History</h1>
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">#</th>
//             <th className="py-2 px-4 border-b">Name</th>
//             {/* <th className="py-2 px-4 border-b">Email</th> */}
//             <th className="py-2 px-4 border-b">Service</th>
//             <th className="py-2 px-4 border-b">Service Type</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Total Cost</th>
//             <th className="py-2 px-4 border-b">Date</th>
//             <th className="py-2 px-4 border-b">Time</th>
//             <th className="py-2 px-4 border-b">Action</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking, index) => (
//             <tr key={booking._id} className="text-center">
//               <td className="py-2 px-4 border-b">{index + 1}</td>
//               <td className="py-2 px-4 border-b">{booking.userName}</td>
//               {/* <td className="py-2 px-4 border-b">{booking.userEmail}</td> */}
//               <td className="py-2 px-4 border-b">{booking.serviceName}</td>
//               <td className="py-2 px-4 border-b">{booking.serviceType}</td>
//               <td className="py-2 px-4 border-b">
//                  {
//                     booking.bookingStatus === 'paid' ? <span className='text-green-700 bg-green-300 font-bold px-2 py-1 rounded-full'>Paid</span> :
//                     // <span className='text-red-600 font-bold px-2 py-1 rounded-full bg-red-100'>Unpaid</span>
//                     <Link to={`/dashboard/payment/${booking._id}`}>
//                        <button className='btn btn-sm bg-pink-300 text-black font-bold hover:bg-pink-600 hover:text-white'> Pay </button>
//                     </Link>
//                  }


//               </td>
//               <td className="py-2 px-4 border-b">{booking.totalCost} TK</td>
//               <td className="py-2 px-4 border-b">{new Date(booking.bookingDate).toLocaleDateString()}</td>
//               <td className="py-2 px-4 border-b">{booking.bookingTime}</td>
//               <td>
//                 <button  className='text-green-400'> <FaEdit size={20} /></button>
//                 <button onClick={()=> handelBookingDelete(booking._id)} className='ml-1 text-red-400'> <BsFillTrash3Fill size={20} /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingHistory;


import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const BookingHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const bookingModal = useRef(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Fetch bookings
    const { refetch, data: bookings = [], isLoading, isError } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        },
    });

    // Delete booking
    const handelBookingDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire("Deleted!", "Booking has been deleted.", "success");
                    }
                });
            }
        });
    };

    // Open edit modal
    const handleEdit = async (id) => {
        try {
            const res = await axiosSecure.get(`/bookings/${id}`);
            setSelectedBooking(res.data);
            bookingModal.current.showModal();
        } catch (err) {
            console.error(err);
        }
    };

    // Update booking
    const handleBookingUpdate = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const updatedData = {
                serviceType: form.serviceType.value,
                bookingDate: form.bookingDate.value,
                bookingTime: form.bookingTime.value,
                location: form.location.value,
            };
            const res = await axiosSecure.patch(`/bookings/${selectedBooking._id}`, updatedData);
            if (res.data.modifiedCount) {
                Swal.fire("Updated!", "Booking has been updated.", "success");
                refetch();
                bookingModal.current.close();
                setSelectedBooking(null);
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Failed to update booking.", "error");
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Booking History</h1>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Service</th>
                        <th className="py-2 px-4 border-b">Service Type</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Total Cost</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Time</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking._id} className="text-center">
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{booking.userName}</td>
                            <td className="py-2 px-4 border-b">{booking.serviceName}</td>
                            <td className="py-2 px-4 border-b">{booking.serviceType}</td>
                            <td className="py-2 px-4 border-b">
                                {booking.bookingStatus === 'paid' ? (
                                    <span className='text-green-700 bg-green-300 font-bold px-2 py-1 rounded-full'>Paid</span>
                                ) : (
                                    <Link to={`/dashboard/payment/${booking._id}`}>
                                        <button className='btn btn-sm bg-pink-300 text-black font-bold hover:bg-pink-600 hover:text-white'>Pay</button>
                                    </Link>
                                )}
                            </td>
                            <td className="py-2 px-4 border-b">{booking.totalCost} TK</td>
                            <td className="py-2 px-4 border-b">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{booking.bookingTime}</td>
                            <td className="py-2 px-4 flex justify-center gap-2">
                                <button onClick={() => handleEdit(booking._id)} className='text-green-400'><FaEdit size={20} /></button>
                                <button onClick={() => handelBookingDelete(booking._id)} className='text-red-400'><BsFillTrash3Fill size={20} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Booking Modal */}
            <dialog ref={bookingModal} className="modal modal-bottom sm:modal-middle backdrop:bg-black/30" onClose={() => setSelectedBooking(null)}>
                <motion.div className="modal-box p-6 sm:p-8 rounded-3xl bg-white shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="font-extrabold text-3xl mb-6 text-pink-600 text-center">
                        Update Booking
                    </h3>

                    {selectedBooking && (
                        <form className="space-y-5" onSubmit={handleBookingUpdate}>
                            {/* Service Type */}
                            <div className="form-control mt-4">
                                <label className="label font-semibold">Service Type</label>
                                <div className="flex items-center gap-6 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value="in-studio"
                                            defaultChecked={selectedBooking.serviceType === "in-studio"}
                                            className="radio checked:bg-pink-500"
                                        />
                                        <span>In Studio</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="serviceType"
                                            value="on-site"
                                            defaultChecked={selectedBooking.serviceType === "on-site"}
                                            className="radio checked:bg-pink-500"
                                        />
                                        <span>On Site</span>
                                    </label>
                                </div>
                            </div>

                            {/* Booking Date & Time */}
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <div className="flex-1 form-control mt-4 sm:mt-0">
                                    <label className="label font-semibold">Booking Date</label>
                                    <input
                                        type="date"
                                        name="bookingDate"
                                        defaultValue={new Date(selectedBooking.bookingDate).toISOString().split("T")[0]}
                                        className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
                                        required
                                    />
                                </div>
                                <div className="flex-1 form-control mt-4 sm:mt-0">
                                    <label className="label font-semibold">Booking Time</label>
                                    <input
                                        type="time"
                                        name="bookingTime"
                                        defaultValue={selectedBooking.bookingTime}
                                        className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="form-control mt-4">
                                <label className="label font-semibold">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={selectedBooking.location}
                                    className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className="modal-action justify-end gap-4 mt-4">
                                <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700">Update</button>
                                <button type="button" className="bg-gray-300 px-6 py-2 rounded-xl hover:bg-gray-400" onClick={() => bookingModal.current.close()}>Cancel</button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </dialog>
        </div>
    );
};

export default BookingHistory;

