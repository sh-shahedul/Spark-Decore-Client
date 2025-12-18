// // import React, { useState, useEffect, useMemo } from 'react';
// // // import axios from 'axios'; // সার্ভার থেকে ডেটা আনার জন্য

// // // ডামি ডেটা: সজ্জাকারীর সম্পন্ন হওয়া কাজের পেমেন্ট রেকর্ড
// // const DUMMY_EARNINGS = [
// //     { 
// //         _id: 'E101', 
// //         serviceName: 'Office Seminar Arrangement', 
// //         completionDate: '2025-11-20T13:00:00Z', 
// //         totalCost: 150000, 
// //         decoratorEarning: 20000, // কমিশনের পর সজ্জাকারীর উপার্জন
// //         payoutStatus: 'Paid' 
// //     },
// //     { 
// //         _id: 'E102', 
// //         serviceName: 'Wedding Grand Decor Package', 
// //         completionDate: '2025-12-01T19:00:00Z', // বর্তমান মাসের কাজ
// //         totalCost: 350000, 
// //         decoratorEarning: 50000, 
// //         payoutStatus: 'Paid' 
// //     },
// //     { 
// //         _id: 'E103', 
// //         serviceName: 'Birthday Party Setup', 
// //         completionDate: '2025-12-10T11:00:00Z', // বর্তমান মাসের কাজ
// //         totalCost: 50000, 
// //         decoratorEarning: 7500, 
// //         payoutStatus: 'Pending' // এটি পেন্ডিং থাকবে
// //     },
// //     { 
// //         _id: 'E104', 
// //         serviceName: 'Small Event Lighting', 
// //         completionDate: '2025-10-15T15:00:00Z', 
// //         totalCost: 20000, 
// //         decoratorEarning: 3000, 
// //         payoutStatus: 'Paid' 
// //     },
// // ];

// // // BDT ফরম্যাটিং ফাংশন
// // const formatBDT = (amount) => {
// //     return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' }).format(amount);
// // };

// // const EarningsSummary = () => {
// //     const [earningsData, setEarningsData] = useState(DUMMY_EARNINGS);
// //     const [loading, setLoading] = useState(false);

// //     // ১. সার্ভার থেকে ডেটা লোড করার লজিক (প্রয়োজনে ব্যবহার করবেন)
// //     /*
// //     useEffect(() => {
// //         const fetchEarnings = async () => {
// //             setLoading(true);
// //             try {
// //                 // সার্ভার এন্ডপয়েন্ট ব্যবহার করুন
// //                 const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/decorator/earnings-history`, {
// //                     headers: {
// //                         Authorization: `Bearer ${localStorage.getItem('token')}` 
// //                     }
// //                 });
// //                 setEarningsData(response.data);
// //             } catch (error) {
// //                 console.error("Error fetching earnings:", error);
// //                 // ব্যর্থতার জন্য টোস্ট নোটিফিকেশন
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchEarnings();
// //     }, []);
// //     */

// //     // ২. উপার্জনের হিসাব (useMemo ব্যবহার করা হয়েছে পারফরম্যান্সের জন্য)
// //     const summary = useMemo(() => {
// //         const currentMonth = new Date('2025-12-01').getMonth(); // ডামি ডেটার জন্য ডিসেম্বর ধরা হয়েছে
        
// //         const totalEarnings = earningsData.reduce((sum, item) => sum + item.decoratorEarning, 0);
        
// //         const monthlyEarnings = earningsData.reduce((sum, item) => {
// //             const itemMonth = new Date(item.completionDate).getMonth();
// //             if (itemMonth === currentMonth) {
// //                 return sum + item.decoratorEarning;
// //             }
// //             return sum;
// //         }, 0);

// //         const pendingPayouts = earningsData.reduce((sum, item) => {
// //             if (item.payoutStatus === 'Pending') {
// //                 return sum + item.decoratorEarning;
// //             }
// //             return sum;
// //         }, 0);

// //         return { totalEarnings, monthlyEarnings, pendingPayouts };
// //     }, [earningsData]);


// //     if (loading) {
// //         return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
// //     }

// //     return (
// //         <div className="p-4 md:p-8">
// //             <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b-2 pb-2">Earnings Summary</h2>

// //             {/* উপার্জনের সামারি কার্ডস */}
// //             <div className="stats shadow w-full bg-primary text-primary-content mb-10">
                
// //                 {/* ১. মোট উপার্জন */}
// //                 <div className="stat">
// //                     <div className="stat-title text-white">Total Lifetime Earnings</div>
// //                     <div className="stat-value text-white">{formatBDT(summary.totalEarnings)}</div>
// //                     <div className="stat-desc text-white opacity-70">Across all completed projects</div>
// //                 </div>
                
// //                 {/* ২. মাসিক উপার্জন */}
// //                 <div className="stat">
// //                     <div className="stat-title text-white">Current Month Earning</div>
// //                     <div className="stat-value text-white">{formatBDT(summary.monthlyEarnings)}</div>
// //                     <div className="stat-desc text-white opacity-70">Income this month (Dec 2025)</div>
// //                 </div>
                
// //                 {/* ৩. পেন্ডিং পেমেন্ট */}
// //                 <div className="stat">
// //                     <div className="stat-title text-white">Pending Payouts</div>
// //                     <div className="stat-value text-warning">{formatBDT(summary.pendingPayouts)}</div>
// //                     <div className="stat-desc text-white opacity-70">Waiting for payment processing</div>
// //                 </div>
// //             </div>

// //             {/* পেমেন্ট হিস্টরি টেবিল */}
// //             <h3 className="text-2xl font-semibold mb-4 text-gray-700">Payment History (Completed Projects)</h3>
            
// //             <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
// //                 <table className="table w-full">
// //                     {/* টেবিল হেডার */}
// //                     <thead className="bg-base-200 text-gray-600">
// //                         <tr>
// //                             <th># ID</th>
// //                             <th>Service Name</th>
// //                             <th>Completion Date</th>
// //                             <th>Total Cost</th>
// //                             <th>Your Earning (BDT)</th>
// //                             <th>Payout Status</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {earningsData.length > 0 ? (
// //                             earningsData.map((item) => (
// //                                 <tr key={item._id} className="hover:bg-gray-50">
// //                                     <th>{item._id}</th>
// //                                     <td>{item.serviceName}</td>
// //                                     <td>{new Date(item.completionDate).toLocaleDateString('en-GB')}</td>
// //                                     <td>{formatBDT(item.totalCost)}</td>
// //                                     <td className="font-bold text-success">{formatBDT(item.decoratorEarning)}</td>
// //                                     <td>
// //                                         <span className={`badge ${item.payoutStatus === 'Paid' ? 'badge-success' : 'badge-warning'} text-white`}>
// //                                             {item.payoutStatus}
// //                                         </span>
// //                                     </td>
// //                                 </tr>
// //                             ))
// //                         ) : (
// //                             <tr>
// //                                 <td colSpan="6" className="text-center py-4 text-gray-500">No payment history available yet.</td>
// //                             </tr>
// //                         )}
// //                     </tbody>
// //                 </table>
// //             </div>

// //             {/* Pagination is a challenge requirement (if needed) */}
// //         </div>
// //     );
// // };

// // export default EarningsSummary;



// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import useAuth from '../../../../hooks/useAuth';

// const EarningsSummary = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: earnings = {}, isLoading } = useQuery({
//     queryKey: ['earningsSummary', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/decorator/earnings-summary?email=${user.email}`
//       );
//       return res.data;
//     }
//   });

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
//       <div className="p-4 bg-green-100 rounded shadow text-center">
//         <h3 className="font-semibold">Total Earnings</h3>
//         <p className="text-2xl font-bold">৳ {earnings.totalEarnings || 0}</p>
//       </div>

//       <div className="p-4 bg-blue-100 rounded shadow text-center">
//         <h3 className="font-semibold">Today's Earnings</h3>
//         <p className="text-2xl font-bold">৳ {earnings.todayEarnings || 0}</p>
//       </div>

//       <div className="p-4 bg-yellow-100 rounded shadow text-center">
//         <h3 className="font-semibold">Completed Projects</h3>
//         <p className="text-2xl font-bold">{earnings.totalCompletedProjects || 0}</p>
//       </div>
//     </div>
//   );
// };

// export default EarningsSummary;


// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import useAuth from '../../../../hooks/useAuth';

// const EarningsDetail = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: earningsData = {}, isLoading } = useQuery({
//     queryKey: ['decoratorEarningsDetail', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/decorator/earnings-detail?email=${user.email}`
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;

//   const { totalEarnings, todayEarnings, totalCompletedProjects, bookings } = earningsData;

//   return (
//     <div className="p-4">
//       {/* Earnings Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <div className="p-4 bg-green-100 rounded shadow text-center">
//           <h3 className="font-semibold">Total Earnings</h3>
//           <p className="text-2xl font-bold">৳ {totalEarnings || 0}</p>
//         </div>
//         <div className="p-4 bg-blue-100 rounded shadow text-center">
//           <h3 className="font-semibold">Today's Earnings</h3>
//           <p className="text-2xl font-bold">৳ {todayEarnings || 0}</p>
//         </div>
//         <div className="p-4 bg-yellow-100 rounded shadow text-center">
//           <h3 className="font-semibold">Completed Projects</h3>
//           <p className="text-2xl font-bold">{totalCompletedProjects || 0}</p>
//         </div>
//       </div>

//       {/* Booking Details Table */}
//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Email</th>
//               <th>Service</th>
//               <th>Total Cost</th>
//               <th>Booking Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings?.map((b) => (
//               <tr key={b._id}>
//                 <td>{b.userName}</td>
//                 <td>{b.userEmail}</td>
//                 <td>{b.serviceName}</td>
//                 <td>৳ {b.totalCost}</td>
//                 <td>{b.bookingDate}</td>
//                 <td>
//                   <span className={`badge ${b.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
//                     {b.assignedDecoatorStatus}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EarningsDetail;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loading from '../../../../Component/Loading/Loading';

const EarningSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: earningsData = {}, isLoading } = useQuery({
    queryKey: ['decoratorEarningsDetail', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/earnings-detail?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>

  const { totalEarnings, todayEarnings, totalCompletedProjects, bookings } = earningsData;

  return (
    <div className="p-2 sm:p-4 md:p-6">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 md:p-6 bg-green-100 rounded shadow text-center">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">Total Earnings (BDT)</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">{totalEarnings || 0}</p>
        </div>
        <div className="p-3 sm:p-4 md:p-6 bg-blue-100 rounded shadow text-center">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">Today's Earnings (BDT)</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">{todayEarnings || 0}</p>
        </div>
        <div className="p-3 sm:p-4 md:p-6 bg-yellow-100 rounded shadow text-center">
          <h3 className="font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">Completed Projects</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold">{totalCompletedProjects || 0}</p>
        </div>
      </div>

      {/* Booking Details Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#007b91] text-white">
            <tr>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">User Name</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap"> Service</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Email</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Total Cost (BDT)</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Booking Date</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings?.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 transition">
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-sky-600 font-semibold whitespace-nowrap"><span className='bg-sky-100 px-2 py-1 rounded-full'>{b.userName}</span></td>
                <td className=" text-xs sm:text-sm text-[#FAB12F] font-bold whitespace-nowrap">{b.serviceName}</td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold text-xs sm:text-sm">
                    {b.userEmail}
                  </span>
                </td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold text-green-600 whitespace-nowrap"> {b.totalCost}</td>
                <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 font-bold whitespace-nowrap">{b.bookingDate}</td>
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                  <span className={`badge badge-sm text-xs ${b.paymentStatus === 'paid' ? 'badge-success font-medium' : 'badge-warning'}`}>
                    {b.assignedDecoatorStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningSummary;