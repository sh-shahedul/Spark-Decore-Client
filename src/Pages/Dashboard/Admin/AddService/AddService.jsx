import React from "react";
import { useForm } from "react-hook-form";
import {
  FaPlusCircle,
  FaEnvelope,
  FaMoneyBillWave,
  FaLayerGroup,
  FaImage,
  FaTag,
} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      cost: parseFloat(data.cost),
      createdByEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    axiosSecure.post("/services", payload).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
            title: "Service Added!",
            text: "Your service has been added successfully.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#005461",
            iconColor: "#FAB12F",
            background: "#ffffff",
            color: "#005461",
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#e6f3f5]  py-8 px-2 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaPlusCircle className="text-[#FAB12F] text-3xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#005461]">
            Add New Service
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
              <FaEnvelope className="text-[#005461]" /> Your Email
            </label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Service Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
              <FaTag className="text-[#005461]" /> Service Name
            </label>
            <input
              {...register("service_name", { required: true })}
              placeholder="Outdoor Holud Night Event"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg
              focus:ring-2 focus:ring-[#005461] outline-none"
            />
          </div>

          {/* Cost & Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
                <FaMoneyBillWave className="text-[#005461]" /> Cost
              </label>
              <input
                type="number"
                {...register("cost", { required: true })}
                placeholder="60000"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg
                focus:ring-2 focus:ring-[#005461] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Unit
              </label>
              <select
                {...register("unit", { required: true })}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg
                focus:ring-2 focus:ring-[#005461] outline-none"
              >
                <option value="">Select Unit</option>
                <option value="per event">Per Event</option>
                <option value="per hall">Per Hall</option>
                <option value="per floor">Per Floor</option>
                <option value="per room">Per Room</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
              <FaLayerGroup className="text-[#005461]" /> Category
            </label>
            <select
              {...register("service_category", { required: true })}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg
              focus:ring-2 focus:ring-[#005461] outline-none"
            >
              <option value="">Select Category</option>
              <option value="wedding">Wedding</option>
              <option value="party">Party</option>
              <option value="office">Office</option>
              <option value="home">Home</option>
              <option value="meeting">Meeting</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              placeholder="Describe your service..."
              className="w-full border border-gray-300 px-4 py-3 rounded-lg
              focus:ring-2 focus:ring-[#005461] outline-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1">
              <FaImage className="text-[#005461]" /> Image URL
            </label>
            <input
              {...register("image", { required: true })}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg
              focus:ring-2 focus:ring-[#005461] outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2
            bg-[#005461] hover:bg-[#00414c] text-white font-semibold
            py-3 rounded-xl transition"
          >
            <FaPlusCircle /> Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
