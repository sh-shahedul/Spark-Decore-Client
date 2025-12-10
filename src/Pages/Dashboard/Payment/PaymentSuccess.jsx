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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                
                {/* Check mark */}
                <div className="text-green-500 text-6xl mb-4">✔</div>

                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction has been processed successfully.
                </p>

                {/* Transaction Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                    <p className="mb-2"><strong>Transaction ID:</strong> {paymentInfo.transactionId || "Loading..."}</p>
                    <p className="mb-2"><strong>Tracking ID:</strong> {paymentInfo.trackingId || "Loading..."}</p>
                    {paymentInfo.amount && <p className="mb-2"><strong>Amount:</strong> ${paymentInfo.amount}</p>}
                    {paymentInfo.email && <p><strong>Email:</strong> {paymentInfo.email}</p>}
                </div>

                {/* Button */}
                <button
                    onClick={() => window.location.href = '/dashboard/booking-history'}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                    Go to Booking History
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
