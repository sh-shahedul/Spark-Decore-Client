import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure"; 

// ChartJS setup
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportAnalisis = () => {
  const axiosSecure = useAxiosSecure();

  // TanStack Query v5 style
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/revenue"); 
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error fetching revenue data</p>;

  const { totalRevenue, monthlyRevenue, payments } = data || {
    totalRevenue: 0,
    monthlyRevenue: [],
    payments: [],
  };

  // Chart data
  const chartData = {
    labels: monthlyRevenue.map((m) => m.month),
    datasets: [
      {
        label: "Revenue (USD)",
        data: monthlyRevenue.map((m) => m.revenue),
        backgroundColor: "#7c3aed",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Revenue" },
    },
  };

  return (
    <div className="p-8 space-y-10">
      {/* Total Revenue */}
      <div className="bg-purple-600 text-white p-8 rounded-xl text-center shadow-lg">
        <h2 className="text-3xl font-bold">Total Revenue</h2>
        <p className="text-5xl mt-4 font-extrabold">
          {totalRevenue.toLocaleString()} USD
        </p>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <h3 className="text-2xl font-bold mb-4">Recent Transactions</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Customer Email</th>
              <th className="border p-2 text-left">Service Name</th>
              <th className="border p-2 text-left">Amount (USD)</th>
              <th className="border p-2 text-left">Paid At</th>
              <th className="border p-2 text-left">Transaction ID</th>
              <th className="border p-2 text-left">Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.slice(0, 10).map((p, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border p-2">{p.customerEmail}</td>
                <td className="border p-2">{p.serviceName}</td>
                <td className="border p-2">{p.amount}</td>
                <td className="border p-2">{new Date(p.paidAt).toLocaleString()}</td>
                <td className="border p-2">{p.transactionId}</td>
                <td className="border p-2">{p.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportAnalisis;
