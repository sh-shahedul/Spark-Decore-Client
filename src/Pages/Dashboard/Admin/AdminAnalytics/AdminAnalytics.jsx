import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Component/Loading/Loading";

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const {
    totalRevenue,
    monthlyRevenue,
    serviceDemand,
    bookingsHistogram,
  } = data;

  return (
    <div className="p-2 md:p-6 space-y-8 md:space-y-10">

      {/* ================= KPI Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xs sm:text-sm md:text-lg font-medium uppercase tracking-wide">
            Total Revenue
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 sm:mt-3">
            {totalRevenue.toLocaleString()}(BDT)
          </p>
        </div>
      </div>

      {/* ================= Charts Grid ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

        {/* Monthly Revenue */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-3 md:mb-4">
            Revenue Monitoring (Monthly)
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={36}
              />
              <Bar
                dataKey="revenue"
                fill="#3e71f1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Demand */}
        <div className="bg-white  rounded-2xl shadow">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-3 md:mb-4">
            Service Demand Chart
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={serviceDemand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" hide />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar
                dataKey="count"
                fill="#005461"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className="bg-white  rounded-2xl shadow lg:col-span-2">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-3 md:mb-4">
            Number of Services Booked by Users
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsHistogram}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="user" hide />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar
                dataKey="count"
                fill="#FAB12F"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
