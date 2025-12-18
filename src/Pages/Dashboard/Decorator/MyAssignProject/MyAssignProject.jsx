import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import Loading from '../../../../Component/Loading/Loading';
const MyAssignProject = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assignDeco = [], isLoading } = useQuery({
    queryKey: ['assignedProjects', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/assignDecoratore?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  /* Dashboard Calculations */
  const totalProjects = assignDeco.length;
  const paidProjects = assignDeco.filter(p => p.paymentStatus === 'paid').length;
  const totalRevenue = assignDeco
    .filter(p => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + (p.totalCost || 0), 0);

  return (
    <div className="sm:p-6">
      {/* Header */}
      
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#005461] text-center p-8">My Assigned <span className="text-[#FAB12F]">Projects</span></h2>
     

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mb-10 bg-[#005461] p-8 rounded-xl text-center ">
          <div className="text-gray-500 font-bold bg-white px-2 py-3 rounded-xl sm:text-xl ">Total Assigned : <span className='text-sky-500'>{totalProjects}</span></div>
          <div className="text-gray-500 font-bold bg-white px-2 py-3 rounded-xl sm:text-xl ">Paid Projects : <span className='text-[#FAB12F]'>{paidProjects}</span></div>
          <div className="text-gray-500 font-bold bg-white px-2 py-3 rounded-xl sm:text-xl flex items-center justify-center gap-1  ">Total Revenue : <span className='mt-0.5 flex items-center  gap-1 text-green-500 '>{totalRevenue} <TbCoinTakaFilled /></span></div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {assignDeco.map(project => (
  <div
    key={project._id}
    className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
  >
    {/* Top gradient color */}
    <div className="h-1 w-full bg-gradient-to-r from-[#005461] via-[#FAB12F] to-accent"></div>

    <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold line-clamp-2 text-gray-800 break-words">{project.serviceName}</h3>
          <span className="mt-2 sm:mt-0 bg-[#005461] text-white font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">{project.serviceCategory}</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" src={project.photoURL} alt={project.userName} />
          <div className="truncate">
            <p className="font-medium text-gray-700 text-sm sm:text-base truncate">{project.userName}</p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{project.userEmail}</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span className="font-bold">Date:</span><span className='text-primary font-semibold'> {project.bookingDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500" />
            <span className="font-bold flex items-center ">Total: &nbsp; <span className='text-green-600 flex items-center font-semibold'>{project.totalCost} <TbCurrencyTaka size={20} /> </span></span>
          </p>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-gray-100 gap-2 sm:gap-0">
        {/* Payment Status */}
        <span
          className={`${
            project.paymentStatus === 'paid'
              ? 'bg-green-200 text-green-600 font-semibold px-3 py-1 rounded-full'
              : 'bg-yellow-200 text-yellow-600 font-semibold px-3 py-1 rounded-full'
          } text-xs sm:text-sm`}
        >
          {project.paymentStatus}
        </span>

        {/* Assigned Decorator Status */}
        <span
          className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full ${
            project.assignedDecoatorStatus === 'assigned'
              ? 'bg-gray-300 text-gray-800'
              : project.assignedDecoatorStatus === 'planning'
              ? 'bg-blue-400 text-white'
              : project.assignedDecoatorStatus === 'materials-prepared'
              ? 'bg-yellow-400 text-white'
              : project.assignedDecoatorStatus === 'on-the-way'
              ? 'bg-indigo-500 text-white'
              : project.assignedDecoatorStatus === 'setup-in-progress'
              ? 'bg-orange-500 text-white'
              : project.assignedDecoatorStatus === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-400 text-white'
          }`}
        >
          {project.assignedDecoatorStatus}
        </span>
      </div>
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-2xl"></div>
  </div>
))}


      </div>
    </div>
  );
};

export default MyAssignProject;
