import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { FaCalendarAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';

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
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  /* =====================
     Dashboard Calculations
  ====================== */
  const totalProjects = assignDeco.length;
  const paidProjects = assignDeco.filter(
    (p) => p.paymentStatus === 'paid'
  ).length;
  const pendingProjects = totalProjects - paidProjects;
  const totalRevenue = assignDeco
    .filter((p) => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + (p.totalCost || 0), 0);

  return (
    <div className="p-4">
      {/* =====================
          Header
      ====================== */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Assigned Projects</h2>
        <span className="badge badge-primary badge-outline">
          {totalProjects} Projects
        </span>
      </div>

      {/* =====================
          Stats Cards
      ====================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Assigned</div>
          <div className="stat-value text-primary">{totalProjects}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Paid Projects</div>
          <div className="stat-value text-success">{paidProjects}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Pending Payment</div>
          <div className="stat-value text-warning">{pendingProjects}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-green-600">
            {totalRevenue} ৳
          </div>
        </div>
      </div>

      {/* =====================
          Project Cards
      ====================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assignDeco.map((project) => (
          <div
            key={project._id}
            className="relative group rounded-2xl overflow-hidden bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold line-clamp-2">
                  {project.serviceName}
                </h3>
                <span className="badge badge-info badge-sm">
                  {project.serviceCategory}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10">
                    <FaUser />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{project.userName}</p>
                  <p className="text-xs text-gray-500">
                    {project.userEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span className="font-semibold">Date:</span>
                  {project.bookingDate}
                </p>

                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500" />
                  <span className="font-semibold">Total:</span>
                  {project.totalCost} BDT
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-base-200">
                <span
                  className={`badge ${
                    project.paymentStatus === 'paid'
                      ? 'badge-success'
                      : 'badge-warning'
                  }`}
                >
                  {project.paymentStatus}
                </span>

                <span className="badge badge-outline badge-info">
                  {project.assignedDecoatorStatus}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAssignProject;
