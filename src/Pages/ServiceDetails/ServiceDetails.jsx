import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaArrowLeft } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SlCalender } from "react-icons/sl";
import { HiCalendar } from "react-icons/hi";
import { FaChartSimple, FaUserGroup } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Loading from "../../Component/Loading/Loading";
// import PageNotFound from "../Error/PageNotFound/PageNotFound";
import Error404 from "../Error/Error404/Error404";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const serviceModalRef = useRef(null);

  const [quantity, setQuantity] = useState(1);

  // Fetch service using TanStack Query
  const { data: service, isLoading } = useQuery({
    queryKey: ["single-service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  // Modal handler
  const handelServiceModal = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    serviceModalRef.current.showModal();
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handelBooking = async (data) => {
    const qty = parseInt(data.quantity || 1);
    const totalCost = service.cost * qty;

    const bookingInfo = {
      userName: user?.displayName,
      userEmail: user?.email,
      serviceName: service.service_name,
      serviceId: service._id,
      unit: service.unit,
      photoURL:user?.photoURL,
      serviceType : data.serviceType,
      serviceCategory: service.service_category,
      quantity: qty,
      totalCost,
      // bookingStatus: "pending",
      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      location: data.location,  
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);
      if (res.data.insertedId) {
        navigate('/dashboard/booking-history')
        toast.success("Booking Successful!");
        serviceModalRef.current.close();
        reset();
        setQuantity(1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed!");
    }
  };

  if (isLoading) return <Loading></Loading>;
  if (!service) return <Error404></Error404>

  return (
    <motion.div
      className="mt-30 max-w-screen-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row p-6 lg:p-12 gap-8 relative my-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 hover:bg-pink-50 transition-colors z-10"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Image */}
      <div className="lg:w-1/2 h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-lg relative group">
        <img
          src={service.image}
          alt={service.service_name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="lg:w-1/2 flex flex-col justify-center md:gap-6 gap-3">
        <h1 className="md:text-5xl text-2xl font-extrabold text-[#005461]">
          {service.service_name}
        </h1>

        <p className="text-gray-800 md:text-2xl text-xl font-semibold flex items-center gap-1">
         <FaChartSimple size={22} /> Cost: <span className="text-[#005461]">{service.cost} BDT</span> /{" "}
         <span className="text-[#FAB12F]"> {service.unit}</span>
        </p>

        <p className="md:text-lg text-base font-bold flex items-center gap-1">
        <BiSolidCategoryAlt size={18}/>  Category:{" "}
          <span className="font-medium text-gray-600">
            {service.service_category}
          </span>
        </p>

        {service.description && (
          <p className="text-gray-700 text-lg mt-2">{service.description}</p>
        )}

        <div className="mt-4 space-y-2">
          <p className="md:text-lg text-base font-bold flex items-center gap-1">
           <FaUserGroup size={18} /> Created By:{" "}
            <span className="font-medium text-gray-600">
              {service.createdByEmail}
            </span>
          </p>
          <p className="md:text-lg text-base font-bold flex items-center gap-1">
           <HiCalendar size={20}/> Created At:{" "}
            <span className="font-medium text-gray-600">
              {new Date(service.createdAt).toLocaleString()}
            </span>
          </p>
        </div>

        {/* Book Button */}
        <motion.button
          onClick={handelServiceModal}
          whileHover={{ scale: 1.05 }}
          className="mt-6 w-max px-8 py-4 bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white hover:text-[#FAB12F] font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
        ><SlCalender />
          Book This Service
        </motion.button>
      </div>

      {/* Modal */}
      <dialog ref={serviceModalRef} className="modal modal-bottom sm:modal-middle">
        <motion.div
          className="modal-box p-6 sm:p-8 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-extrabold text-3xl mb-6 text-[#005461] text-center">
            Book This Service
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit(handelBooking)}>

  {/* Service Name */}
  <div className="form-control">
    <label className="label font-semibold flex items-center gap-2">
      <span className="material-icons text-[#005461]">room_service</span>
      Service Name
    </label>
    <input
      type="text"
      value={service.service_name}
      readOnly
      className="w-full input input-bordered mt-1 bg-gray-100 rounded-xl shadow-inner px-4 py-2"
    />
  </div>

  {/* Name & Email */}
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <div className="flex-1 form-control">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461]">person</span>
        Your Name
      </label>
      <input
        type="text"
        defaultValue={user?.displayName}
        readOnly
        className="w-full input input-bordered mt-1 bg-gray-100 rounded-xl shadow-inner px-4 py-2"
      />
    </div>

    <div className="flex-1 form-control mt-4 sm:mt-0">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461]">email</span>
        Your Email
      </label>
      <input
        type="email"
        defaultValue={user?.email}
        readOnly
        className="w-full input input-bordered mt-1 bg-gray-100 rounded-xl shadow-inner px-4 py-2"
      />
    </div>
  </div>

  {/* Service Type (Radio) */}
  <div className="form-control mt-4">
    <label className="label font-semibold flex items-center gap-2">
      <span className="material-icons text-[#005461]">category</span>
      Service Type
    </label>

    <div className="flex items-center gap-6 mt-2">
      {/* In studio */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="in-studio"
          {...register("serviceType", { required: true })}
          className="radio checked:text-[#005461]"
        />
        <span className="font-medium">In Studio</span>
      </label>

      {/* On site */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          value="on-site"
          {...register("serviceType", { required: true })}
          className="radio checked:text-[#005461]"
        />
        <span className="font-medium">On Site</span>
      </label>
    </div>

    {errors.serviceType && (
      <p className="text-[#005461] text-sm mt-1">
        Please select a service type
      </p>
    )}
  </div>

  {/* Quantity & Total Cost */}
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <div className="flex-1 form-control">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461] ">add</span>
        Quantity ({service.unit})
      </label>
      <input
        type="number"
        {...register("quantity", { required: true, min: 1 })}
        value={quantity}
        onChange={(e) => {
          const val = Number(e.target.value);
          setQuantity(val);
          setValue("quantity", val);
        }}
        className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
      />
      {errors.quantity && (
        <p className="text-[#005461] text-sm mt-1">Quantity is required</p>
      )}
    </div>

    <div className="flex-1 form-control mt-4 sm:mt-0">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461]">attach_money</span>
        Total Cost
      </label>
      <input
        type="text"
        value={`${quantity ? quantity * service.cost : service.cost} BDT`}
        readOnly
        className="w-full input input-bordered mt-1 bg-gray-100 rounded-xl shadow-inner px-4 py-2"
      />
    </div>
  </div>

  {/* Booking Date & Time */}
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <div className="flex-1 form-control">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461]">calendar_today</span>
        Booking Date
      </label>
      <input
        type="date"
        {...register("bookingDate", { required: true })}
        className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
      />
      {errors.bookingDate && (
        <p className="text-[#005461] text-sm mt-1">Booking date is required</p>
      )}
    </div>

    <div className="flex-1 form-control mt-4 sm:mt-0">
      <label className="label font-semibold flex items-center gap-2">
        <span className="material-icons text-[#005461]">schedule</span>
        Booking Time
      </label>
      <input
        type="time"
        {...register("bookingTime", { required: true })}
        className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
      />
      {errors.bookingTime && (
        <p className="text-[#005461] text-sm mt-1">Booking time is required</p>
      )}
    </div>
  </div>

  {/* Location */}
  <div className="form-control">
    <label className="label font-semibold flex items-center gap-2">
      <span className="material-icons text-[#005461]">location_on</span>
      Location
    </label>
    <input
      type="text"
      placeholder="Enter location"
      {...register("location", { required: true })}
      className="w-full input input-bordered mt-1 rounded-xl px-4 py-2"
    />
    {errors.location && (
      <p className="text-[#005461] text-sm mt-1">Location is required</p>
    )}
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-[#005461] to-[#008080] hover:from-[#008080] hover:to-[#005461] text-white hover:text-[#FAB12F] font-bold rounded-2xl mt-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    Confirm Booking
  </button>
</form>


          {/* Close Button */}
          <div className="modal-action mt-4 ">
            <form method="dialog">
              <button className=" w-full rounded-xl text-[#005461] hover:text-[#FAB12F]"><ImCross /></button>
            </form>
          </div>
        </motion.div>
      </dialog>
    </motion.div>
  );
};

export default ServiceDetails;
