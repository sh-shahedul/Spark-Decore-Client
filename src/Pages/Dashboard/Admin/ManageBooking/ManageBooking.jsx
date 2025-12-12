import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load bookings
  useEffect(() => {
    axios.get("http://localhost:3000/bookings").then((res) => setBookings(res.data));
  }, []);

  // Open modal and load decorators
  const openDecoratorModal = async (booking) => {
    setSelectedBooking(booking);
    const res = await axios.get("http://localhost:3000/users/decorators/active");
    setDecorators(res.data);
    setShowModal(true);
  };

  // Assign decorator
  const assignDecorator = async (decoratorId) => {
    if (!selectedBooking) return;
    try {
      await axios.patch(
        `http://localhost:3000/bookings/${selectedBooking._id}/assign-decorator`,
        { decoratorId }
      );

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
                decoratorAssigned: true,
              }
            : b
        )
      );

      setShowModal(false);
      alert("Decorator assigned successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to assign decorator");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

      <table className="table-auto w-full border shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-3 py-2 border">User</th>
            <th className="px-3 py-2 border">Service</th>
            <th className="px-3 py-2 border">Type</th>
            <th className="px-3 py-2 border">Booking Date</th>
            <th className="px-3 py-2 border">Location</th>
            <th className="px-3 py-2 border">Payment</th>
            <th className="px-3 py-2 border">Decorator</th>
            <th className="px-3 py-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => {
            const isInStudio = booking.serviceType === "in-studio";
            const isPaid = booking.paymentStatus === "paid";

            return (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{booking.userName}</td>
                <td className="border px-3 py-2">{booking.serviceName}</td>

                <td className="border px-3 py-2 font-semibold">
                  {booking.serviceType}
                </td>

                <td className="border px-3 py-2">{booking.bookingDate}</td>
                <td className="border px-3 py-2">{booking.location}</td>

                <td className="border px-3 py-2">
                 <span
                   className={
                     booking.paymentStatus === "paid"
                       ? "bg-green-200 text-green-900 px-2 py-1 rounded"
                       : "bg-red-200 text-red-900 px-2 py-1 rounded"
                   }
                  >
                    {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>

                <td className="border px-3 py-2">
                  {booking.decoratorAssigned ? (
                    <span className="text-green-700 font-semibold">
                      Assigned ({booking.assignedDecoratorName})
                    </span>
                  ) : (
                    <span className="text-red-500">Not Assigned</span>
                  )}
                </td>

                <td className="border px-3 py-2">
                  {/* FULL LOGIC */}
                  {isInStudio ? (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
                    >
                      Assign Decorator
                    </button>
                  ) : !isPaid ? (
                    <button
                      disabled
                      className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed"
                    >
                      Assign Decorator
                    </button>
                  ) : booking.decoratorAssigned ? (
                    <span className="text-green-700 font-semibold">Assigned</span>
                  ) : (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => openDecoratorModal(booking)}
                    >
                      Assign Decorator
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Select Decorator for {selectedBooking.serviceName}
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {decorators.map((d) => (
                <div
                  key={d._id}
                  className="border p-4 rounded shadow hover:shadow-xl cursor-pointer"
                  onClick={() => assignDecorator(d._id)}
                >
                  <h3 className="font-semibold text-lg">{d.name}</h3>
                  <p className="text-sm">{d.email}</p>
                  <p className="text-sm italic text-gray-600">{d.specialty}</p>
                </div>
              ))}
            </div>

            <button
              className="mt-4 bg-gray-500 text-white px-4 py-1 rounded"
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
