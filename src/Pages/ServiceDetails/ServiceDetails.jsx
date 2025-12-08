import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosSecure from "../hooks/useAxiosSecure";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axiosSecure.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [id,axiosSecure]);

  if (!service) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image */}
      <div className="h-96 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.service_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-pink-600">{service.service_name}</h1>
        <p className="text-gray-800 text-xl font-semibold">
          Cost: {service.cost} BDT / {service.unit}
        </p>
        <p className="text-gray-500 text-lg">Category: {service.service_category}</p>
        {service.description && (
          <p className="text-gray-700 text-lg mt-4">{service.description}</p>
        )}
      </div>

      {/* Optional Button */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        className="block mx-8 mb-8 py-3 text-center bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl shadow-md"
      >
        Book This Service
      </motion.a>
    </motion.div>
  );
};

export default ServiceDetails;
