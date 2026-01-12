
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading/Loading";
import { motion } from 'framer-motion';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <title>spark decore | payment history</title>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 text-[#005461] dark:text-cyan-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Payment History
        </motion.h2>

        {/* Summary Section */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-[#005461] to-[#007a8a] dark:from-cyan-700 dark:to-cyan-600 rounded-2xl shadow-2xl p-6 text-white mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-1">Total Payments</p>
                  <p className="text-3xl font-bold">{payments.length}</p>
                </div>
                <div className="text-center border-l-0 md:border-l border-white/30">
                  <p className="text-sm opacity-90 mb-1">Total Amount</p>
                  <p className="text-3xl font-bold">
                    {payments.reduce((sum, pay) => sum + (pay.amount), 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-center border-l-0 md:border-l border-white/30">
                  <p className="text-sm opacity-90 mb-1">Latest Payment</p>
                  <p className="text-lg font-semibold">
                    {new Date(payments[0]?.paidAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>

        {payments.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">💳</div>
            <p className="text-xl text-gray-500 dark:text-gray-400">No payment history found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl shadow-2xl">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead className="bg-gradient-to-r from-[#005461] to-[#007a8a] dark:from-cyan-700 dark:to-cyan-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold">Service Name</th>
                    <th className="py-4 px-6 text-left font-semibold">Amount(BDT)</th>
                    <th className="py-4 px-6 text-left font-semibold">Currency</th>
                    <th className="py-4 px-6 text-left font-semibold">Transaction ID</th>
                    <th className="py-4 px-6 text-left font-semibold">Status</th>
                    <th className="py-4 px-6 text-left font-semibold">Paid At</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((pay, index) => (
                    <motion.tr 
                      key={pay._id} 
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-4 px-6 font-semibold"><span className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-1 rounded-full">{pay.serviceName}</span></td>
                      <td className="py-4 px-6 font-bold text-[#005461] dark:text-cyan-400">{pay.amount}</td>
                      <td className="py-4 px-6">
                        <span className="badge badge-outline badge-info uppercase dark:border-cyan-400 dark:text-cyan-400">{pay.currency}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300 font-bold">{pay.transactionId}</td>
                      <td className="py-4 px-6">
                        <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></span>
                          {pay.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[#FAB12F] dark:text-yellow-400 font-bold">
                        {new Date(pay.paidAt).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {payments.map((pay, index) => (
                <motion.div 
                  key={pay._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="text-lg font-bold text-[#005461] dark:text-cyan-400 mb-1">{pay.serviceName}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(pay.paidAt).toLocaleString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></span>
                      {pay.paymentStatus}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                      <span className="font-bold text-[#005461] dark:text-cyan-400 text-xl"> {pay.amount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                      <span className="badge badge-outline badge-info uppercase dark:border-cyan-400 dark:text-cyan-400">{pay.currency}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transaction ID:</p>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all bg-gray-50 dark:bg-gray-700 p-2 rounded">{pay.transactionId}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;