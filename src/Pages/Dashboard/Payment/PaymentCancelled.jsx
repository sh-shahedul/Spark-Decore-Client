import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-12 text-center">
                <FaTimesCircle className="text-red-600 text-8xl mb-6 mx-auto" />
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Payment Cancelled</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Oops! Your payment was not successful. Don't worry, you can try again or return to your bookings.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link 
                        to="/dashboard/booking-history"
                        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                        Try Again
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;
