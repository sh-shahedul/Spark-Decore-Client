import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                        amount: res.data.amount,
                        email: res.data.email
                    });
                })
                .catch(err => console.error("Payment fetch failed:", err));
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <title>spark decore | paynment Success</title>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                
                {/* Check mark */}
                <div className="text-green-500 dark:text-green-400 text-6xl mb-4">✔</div>

                <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for your payment. Your transaction has been processed successfully.
                </p>

                {/* Transaction Info */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
                    <p className="mb-2 dark:text-gray-300"><strong>Transaction ID:</strong> {paymentInfo.transactionId || "Loading..."}</p>
                    <p className="mb-2 dark:text-gray-300"><strong>Tracking ID:</strong> {paymentInfo.trackingId || "Loading..."}</p>
                    {paymentInfo.amount && <p className="mb-2 dark:text-gray-300"><strong>Amount:</strong> ${paymentInfo.amount}</p>}
                    {paymentInfo.email && <p className="dark:text-gray-300"><strong>Email:</strong> {paymentInfo.email}</p>}
                </div>

                {/* Button */}
                <button
                    onClick={() => window.location.href = '/dashboard/booking-history'}
                    className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                    Go to Booking History
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;