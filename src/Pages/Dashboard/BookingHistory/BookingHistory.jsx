import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';


const BookingHistory = () => {
    const axiosSecure =useAxiosSecure()
    const{user} = useAuth()
  // Fetch bookings using React Query
  const { refetch,data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`); 
      console.log(res.data)
      return res.data;
    },
  });

   const handelBookingDelete =(id)=>{
        // console.log(id)
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

     axiosSecure.delete(`/bookings/${id}`)
     .then(res=>{
        console.log(res.data)
        if(res.data.deletedCount){
            refetch()
          Swal.fire({
           title: "Deleted!",
           text: "Your file has been deleted.",
           icon: "success"
         });
        }
     })



    
  }
});
   }



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
            {/* <th className="py-2 px-4 border-b">Email</th> */}
            <th className="py-2 px-4 border-b">Service</th>
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
              {/* <td className="py-2 px-4 border-b">{booking.userEmail}</td> */}
              <td className="py-2 px-4 border-b">{booking.serviceName}</td>
              <td className="py-2 px-4 border-b">
                 {
                    booking.bookingStatus === 'paid' ? <span className='text-green-700 bg-green-300 font-bold'>Paid</span> :
                    // <span className='text-red-600 font-bold px-2 py-1 rounded-full bg-red-100'>Unpaid</span>
                    <Link to={`/dashboard/payment/${booking._id}`}>
                       <button className='btn btn-sm bg-pink-300 text-black font-bold hover:bg-pink-600 hover:text-white'> Pay </button>
                    </Link>
                 }


              </td>
              <td className="py-2 px-4 border-b">{booking.totalCost} TK</td>
              <td className="py-2 px-4 border-b">{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{booking.bookingTime}</td>
              <td>
                <button className='text-green-400'> <FaEdit size={20} /></button>
                <button onClick={()=> handelBookingDelete(booking._id)} className='ml-1 text-red-400'> <BsFillTrash3Fill size={20} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
