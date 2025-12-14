import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
const MotionLink = motion(Link);
const ServiceCard = ({ service }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[350px]"
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
          <h2 className="text-lg font-bold text-[#3e71f1] mb-2">
            {service?.service_name}
          </h2>
          <p className="text-gray-800 font-semibold mb-1">
            Cost: {service?.cost} BDT / {service?.unit}
          </p>
          <p className="text-gray-500">
            Category: {service?.service_category}
          </p>
        </div>
  
        {/* Button */}
        <MotionLink to={`/services/${service?._id}`}
          whileHover={{ scale: 1.05 }}
          className="mt-2 w-full py-2 bg-[#005461] text-white hover:text-[#FAB12F] font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <FaEye /> View Details
        </MotionLink>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
