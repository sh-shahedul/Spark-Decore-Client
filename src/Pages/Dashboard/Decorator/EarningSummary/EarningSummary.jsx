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
      <title>spark decore | Earning Summary</title>
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