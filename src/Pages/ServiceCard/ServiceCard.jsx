import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
const MotionLink = motion(Link);
const ServiceCard = ({ service }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-gray-900/50 overflow-hidden flex flex-col h-[350px]"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={service?.image}
          alt={service?.service_name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-bold text-[#3e71f1] dark:text-teal-400 mb-2">
            {service?.service_name}
          </h2>
          <p className="text-gray-800 dark:text-gray-200 font-semibold mb-1">
            Cost: {service?.cost} BDT / {service?.unit}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Category: {service?.service_category}
          </p>
        </div>
  
        {/* Button */}
        <MotionLink to={`/services/${service?._id}`}
          whileHover={{ scale: 1.05 }}
          className="mt-2 w-full py-2 bg-gradient-to-r from-[#005461] to-[#008080] dark:from-teal-600 dark:to-teal-700 hover:from-[#008080] hover:to-[#005461] dark:hover:from-amber-500 dark:hover:to-amber-600 text-white hover:text-[#FAB12F] dark:hover:text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <FaEye /> View Details
        </MotionLink>
      </div>
    </motion.div>
  );
};

export default ServiceCard;