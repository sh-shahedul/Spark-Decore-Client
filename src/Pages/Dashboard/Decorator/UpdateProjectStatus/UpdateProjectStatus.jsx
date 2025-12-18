import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../../Component/Loading/Loading";

const STATUS_FLOW = [
  "assigned",
  "planning",
  "materials-prepared",
  "on-the-way",
  "setup-in-progress",
  "completed",
];

// Map status 
const STATUS_COLORS = {
  assigned: "bg-gray-300 text-gray-800",
  planning: "bg-blue-400 text-white",
  "materials-prepared": "bg-yellow-400 text-white",
  "on-the-way": "bg-indigo-500 text-white",
  "setup-in-progress": "bg-orange-500 text-white",
  completed: "bg-green-600 text-white",
};

const UpdateProjectStatusRow = ({ booking, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!booking || !user) return null;

  const currentStatus = booking.assignedDecoatorStatus || "assigned";
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const nextStatus = STATUS_FLOW[currentIndex + 1] || null;

  const handleUpdateStatus = async () => {
    if (!nextStatus) return;

    try {
      setLoading(true);
      const res = await axiosSecure.patch(
        `/bookings/${booking._id}/update-decorator-status`,
        {
          status: nextStatus,
          decoratorEmail: user.email,
        }
      );

      if (res.data.success) {
        Swal.fire("Updated!", "Project status updated", "success");
        refetch?.();
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Failed to update status",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors ">
      <th className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap ">{index + 1}</th>
      <td className="px-2 sm:px-3 py-2 font-medium text-xs sm:text-sm whitespace-nowrap"><span className="bg-sky-100 px-2 py-1 rounded-full text-sky-500">{booking.serviceName}</span></td>
      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap text-[#FAB12F] font-bold">{booking.userName}</td>
      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap ">
        
        <span className="text-xs text-gray-500 font-bold">{booking.bookingDate} <br />{booking.bookingTime}</span>
      </td>
      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap"><span className="text-purple-600 bg-purple-100 px-2 py-1 rounded-full font-semibold">{booking.location}</span></td>
      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
        {booking.paymentStatus === "paid" ? (
          <span className="badge badge-success badge-sm text-xs">Paid</span>
        ) : (
          <span className="badge badge-warning badge-sm text-xs">Unpaid</span>
        )}
      </td>
      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
        <span className={`badge badge-sm capitalize text-xs ${STATUS_COLORS[currentStatus]}`}>
          {currentStatus.replaceAll("-", " ")}
        </span>
      </td>
      <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
        {nextStatus ? (
          <button
            onClick={handleUpdateStatus}
            disabled={loading}
            className="btn btn-xs btn-primary hover:scale-105 transition-transform text-xs whitespace-nowrap"
          >
            {loading ? "Updating..." : `Move to ${nextStatus.replaceAll("-", " ")}`}
          </button>
        ) : (
          <span className="text-green-600 font-semibold text-xs sm:text-sm whitespace-nowrap">Completed</span>
        )}
      </td>
    </tr>
  );
};

const UpdateProjectStatus = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: assignDeco = [], isLoading, refetch } = useQuery({
    queryKey: ["assignedProjects", user?.email],
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
     <Loading></Loading>
    );
  }

  if (!assignDeco.length) {
    return <div className="text-center py-10 text-base sm:text-lg">No assigned projects found.</div>;
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
        Update Project Status
      </h2>

      <div className="overflow-x-auto  rounded-lg shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#005461] text-white">
            <tr>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">#</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Service Name</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">User</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Date & Time</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Location</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Payment</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Status</th>
              <th className="px-2 sm:px-3 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold  whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignDeco.map((booking, index) => (
              <UpdateProjectStatusRow
                key={booking._id}
                booking={booking}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateProjectStatus;