import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const statusColor = {
  assigned: "badge-info",
  planning: "badge-warning",
  "materials-prepared": "badge-primary",
  "on-the-way": "badge-accent",
  "setup-in-progress": "badge-secondary",
  completed: "badge-success",
};

const TodaySchedule = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ["todaySchedule", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings/decorator/today?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📅 Today’s Schedule</h2>

      {schedules.length === 0 && (
        <p className="text-gray-500">
          No decoration projects scheduled for today 🎉
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-lg">
                {item.serviceName}
              </h2>

              <p>
                <strong>Client:</strong> {item.userName}
              </p>

              <p>
                <strong>Time:</strong> {item.bookingTime}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Total Cost:</strong> ৳{item.totalCost}
              </p>

              <div className="mt-2">
                <span className={`badge ${statusColor[item.assignedDecoatorStatus]}`}>
                  {item.assignedDecoatorStatus}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-400">
                  Tracking ID: {item.trackingId}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
