// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";


// const statusColor = {
//   assigned: "badge-info",
//   planning: "badge-warning",
//   "materials-prepared": "badge-primary",
//   "on-the-way": "badge-accent",
//   "setup-in-progress": "badge-secondary",
//   completed: "badge-success",
// };

// const TodaySchedule = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: schedules = [], isLoading } = useQuery({
//     queryKey: ["todaySchedule", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/decorator/today?email=${user.email}`
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <span className="loading loading-spinner loading-lg"></span>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📅 Today’s Schedule</h2>

//       {schedules.length === 0 && (
//         <p className="text-gray-500">
//           No decoration projects scheduled for today 🎉
//         </p>
//       )}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {schedules.map((item) => (
//           <div key={item._id} className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-lg">
//                 {item.serviceName}
//               </h2>

//               <p>
//                 <strong>Client:</strong> {item.userName}
//               </p>

//               <p>
//                 <strong>Time:</strong> {item.bookingTime}
//               </p>

//               <p>
//                 <strong>Location:</strong> {item.location}
//               </p>

//               <p>
//                 <strong>Total Cost:</strong> ৳{item.totalCost}
//               </p>

//               <div className="mt-2">
//                 <span className={`badge ${statusColor[item.assignedDecoatorStatus]}`}>
//                   {item.assignedDecoatorStatus}
//                 </span>
//               </div>

//               <div className="mt-4">
//                 <p className="text-xs text-gray-400">
//                   Tracking ID: {item.trackingId}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodaySchedule;



// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import Loading from "../../../../Component/Loading/Loading";
// import { FaRegCalendarTimes } from "react-icons/fa";

// const statusColor = {
//   assigned: "badge-info",
//   planning: "badge-warning",
//   "materials-prepared": "badge-primary",
//   "on-the-way": "badge-accent",
//   "setup-in-progress": "badge-secondary",
//   completed: "badge-success",
// };

// const TodaySchedule = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: schedules = [], isLoading } = useQuery({
//     queryKey: ["todaySchedule", user?.email?.toLowerCase()],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/bookings/decorator/today?email=${user.email.toLowerCase()}`
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <Loading></Loading>
//   }
// if (!schedules.length) {
//   return (
//     <div className="flex flex-col items-center justify-center h-64 rounded-xl shadow-lg p-6 text-center animate-fadeIn">
//       <div className="text-6xl text-red-500 mb-4">
//         <FaRegCalendarTimes />
//       </div>
//       <h2 className="text-2xl font-bold text-gray-700 mb-2">
//         No decoration projects scheduled for today
//       </h2>
//       <p className="text-gray-500">Check back later or schedule a new project!</p>
//     </div>
//   );
// }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📅 Today’s Schedule</h2>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {schedules.map((item) => (
//           <div key={item._id} className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title flex items-center gap-2">
//                 {item.photoURL && (
//                   <img
//                     src={item.photoURL}
//                     alt={item.serviceName}
//                     className="w-10 h-10 object-cover rounded-md"
//                   />
//                 )}
//                 {item.serviceName}
//               </h2>

//               <p>
//                 <strong>Client:</strong> {item.userName}
//               </p>

//               <p>
//                 <strong>Time:</strong> {item.bookingTime}
//               </p>

//               <p>
//                 <strong>Location:</strong> {item.location}
//               </p>

//               <p>
//                 <strong>Total Cost:</strong> ৳{item.totalCost.toLocaleString()}
//               </p>

//               <div className="mt-2">
//                 <span
//                   className={`badge ${
//                     statusColor[item.assignedDecoatorStatus] || "badge-ghost"
//                   }`}
//                 >
//                   {item.assignedDecoatorStatus.replaceAll("-", " ")}
//                 </span>
//               </div>

//               <div className="mt-4 text-xs text-gray-400">
//                 Tracking ID: {item.trackingId}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodaySchedule;


import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Component/Loading/Loading";
import { FaRegCalendarTimes, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const statusColor = {
  assigned: "bg-[#005461]/10 text-[#005461]",
  planning: "bg-[#FAB12F]/20 text-[#9a6b00]",
  "materials-prepared": "bg-blue-100 text-blue-700",
  "on-the-way": "bg-purple-100 text-purple-700",
  "setup-in-progress": "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
};

const TodaySchedule = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["todaySchedule", user?.email?.toLowerCase()],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/today?email=${user.email.toLowerCase()}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!schedules.length) {
    return (
      <div className="flex flex-col items-center justify-center h-72 rounded-2xl bg-[#005461]/5 border border-dashed border-[#005461]/30 text-center px-6">
        <FaRegCalendarTimes className="text-5xl text-[#005461] mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#005461]">
          No Jobs Scheduled Today
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
          You’re all clear for today. New decoration assignments will appear here once scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 md:p-6">
      
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#005461]">
          Today’s Decoration Assignments
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Overview of all your scheduled decoration projects for today
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {schedules.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-white shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
          >
        
            <div className="p-5 flex flex-col h-full">
              
               <div className="md:text-2xl text-xl font-bold text-[#005461]">
                  {item.serviceName}
                </div>
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                {item.photoURL && (
                  <img
                    src={item.photoURL}
                    alt={item.serviceName}
                    className="w-12 h-12 rounded-lg object-cover "
                  />
                )}
                <div>
                  <p className="text-base text-gray-500 font-semibold mt-1">
                     {item.userName}
                  </p>
                  <h3 className="font-semibold text-[#FAB12F] leading-snug line-clamp-2">
                    {item.userEmail}
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-600">
               
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#FAB12F]" />
                  <span>{item.bookingTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#FAB12F]" />
                  <span className="line-clamp-1">{item.location}</span>
                </div>

                <p>
                  <span className="font-medium text-gray-700">Total:</span>{" "}
                  <span className="text-[#005461] font-semibold">
                    {item.totalCost.toLocaleString()} (BDT)
                  </span>
                </p>
              </div>

              {/* Status */}
              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    statusColor[item.assignedDecoatorStatus] || "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.assignedDecoatorStatus.replaceAll("-", " ")}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 text-xs text-gray-400 truncate">
                Tracking ID: {item.trackingId}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
