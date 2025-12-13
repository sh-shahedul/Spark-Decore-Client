import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const STATUS_FLOW = [
  "assigned",
  "planning",
  "materials-prepared",
  "on-the-way",
  "setup-in-progress",
  "completed",
];

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
    <tr className="hover">
      <th>{index + 1}</th>
      <td>{booking.serviceName}</td>
      <td>{booking.userName}</td>
      <td>{booking.bookingDate} <br /> <span className="text-xs text-gray-500">{booking.bookingTime}</span></td>
      <td>{booking.location}</td>
      <td>
        {booking.paymentStatus === "paid" ? (
          <span className="badge badge-success">Paid</span>
        ) : (
          <span className="badge badge-warning">Unpaid</span>
        )}
      </td>
      <td>
        <span className="badge badge-outline capitalize">
          {currentStatus.replaceAll("-", " ")}
        </span>
      </td>
      <td>
        {nextStatus ? (
          <button
            onClick={handleUpdateStatus}
            disabled={loading}
            className="btn btn-xs btn-primary"
          >
            {loading ? "Updating..." : `Move to ${nextStatus.replaceAll("-", " ")}`}
          </button>
        ) : (
          <span className="text-green-600 font-semibold text-sm">Completed</span>
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
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!assignDeco.length) {
    return <div className="text-center py-10 text-lg">No assigned projects found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Update Project Status</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>User</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
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
