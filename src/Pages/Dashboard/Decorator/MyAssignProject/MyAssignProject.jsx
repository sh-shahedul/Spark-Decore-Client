import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyAssign = ({ decoratorEmail }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  // Load assigned bookings
  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["assignedBookings", decoratorEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/decorator/${decoratorEmail}`);
      console.log("Bookings from API:", res.data);
      return res.data;
    },
  });

  const handleStatusUpdate = async (bookingId) => {
    if (!status) return toast.error("Please select a status");

    try {
      const res = await axiosSecure.patch(`/bookings/decorator/status/${bookingId}`, {
        status,
        remarks,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Status updated!");
        setSelectedBooking(null);
        setStatus("");
        setRemarks("");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Assigned Projects ({bookings.length})</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((book) => (
              <tr key={book._id} className="text-center border">
                <td>{book.userName}</td>
                <td>{book.userEmail}</td>
                <td>{book.serviceName}</td>
                <td>{book.bookingDate}</td>
                <td className="capitalize">{book.bookingStatus || "assigned"}</td>
                <td>{book.paymentStatus === "paid" ? "Paid" : "Unpaid"}</td>
                <td>{book.remarks || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedBooking(book)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>
            <select
              className="input input-bordered w-full mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="assigned">Assigned</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <textarea
              className="input input-bordered w-full mb-4"
              placeholder="Add Remarks (optional)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="btn btn-primary"
                onClick={() => handleStatusUpdate(selectedBooking._id)}
              >
                Update
              </button>
              <button
                className="btn"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssign;
