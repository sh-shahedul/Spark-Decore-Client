import React from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaUser, FaEnvelope, FaTools, FaArrowLeft } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <h1 className="text-center text-xl mt-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {/* Go Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-pink-700 hover:text-gray-900 font-bold"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
        <p className="text-gray-600">Review your booking and proceed to payment</p>
      </div>

      {/* Booking Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* User Info */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500"/>
              <span>{booking.userName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500"/>
              <span>{booking.userEmail}</span>
            </div>
          </div>
        </div>

        {/* Service Info */}
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaTools className="text-green-500"/>
              <span>{booking.serviceName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBangladeshiTakaSign className="text-green-500" />
              <span>{booking.totalCost}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-500"/>
              <span>{booking.bookingDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500"/>
              <span>{booking.bookingTime}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <FaMapMarkerAlt className="text-red-500"/>
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Unit:</span> {booking.unit}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Quantity:</span> {booking.quantity}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="px-8 py-6 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Total to Pay</h2>
            <p className="text-3xl font-bold text-green-600 flex gap-2 items-center"><FaBangladeshiTakaSign /> {booking.totalCost}</p>
          </div>
          <button className="px-10 py-4 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-all shadow-lg">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
