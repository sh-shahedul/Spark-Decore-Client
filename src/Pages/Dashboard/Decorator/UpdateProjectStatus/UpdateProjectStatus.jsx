import { toast } from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const STATUS_FLOW = [
  "assigned",
  "planning",
  "materials_prepared",
  "on_the_way",
  "setup_in_progress",
  "completed",
];

const STATUS_LABEL = {
  assigned: "Assigned",
  planning: "Planning Phase",
  materials_prepared: "Materials Prepared",
  on_the_way: "On The Way",
  setup_in_progress: "Setup In Progress",
  completed: "Completed",
};

const UpdateProjectStatus = ({ bookingId, currentStatus, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const nextStatus = STATUS_FLOW[currentIndex + 1];

  const handleUpdateStatus = async () => {
    try {
      const res = await axiosSecure.patch(
        `/bookings/${bookingId}/update-status`,
        {
          decoratorEmail: user.email,
        }
      );

      toast.success(
        `Status updated to "${STATUS_LABEL[res.data.currentStatus]}"`
      );
      refetch && refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="mt-3">
      <p className="text-sm">
        Current Status:
        <span className="ml-2 font-semibold text-primary">
          {STATUS_LABEL[currentStatus]}
        </span>
      </p>

      {currentStatus !== "completed" && (
        <button
          onClick={handleUpdateStatus}
          className="btn btn-sm btn-primary mt-2"
        >
          Move to: {STATUS_LABEL[nextStatus]}
        </button>
      )}

      {currentStatus === "completed" && (
        <span className="badge badge-success mt-2">Completed</span>
      )}
    </div>
  );
};

export default UpdateProjectStatus;
