import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

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

    axiosSecure
      .post("/services", payload)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Service added successfully!");
          reset();
        }
      })
      .catch((err) => {
        console.log("Error adding service:", err);
        alert("Failed to add service");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 bg-white rounded-3xl shadow-2xl">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Add New Service
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Email Field */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Your Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Service Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Service Name</label>
          <input
            {...register("service_name", { required: true })}
            placeholder="Outdoor Holud Night Event"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Cost & Unit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Cost</label>
            <input
              type="number"
              {...register("cost", { required: true })}
              placeholder="60000"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Unit</label>
            <select
              {...register("unit", { required: true })}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
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
          <label className="block mb-2 font-semibold text-gray-700">Category</label>
          <select
            {...register("service_category", { required: true })}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
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
          <label className="block mb-2 font-semibold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Describe your service here..."
            rows={5}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
          <input
            {...register("image", { required: true })}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 transition-colors text-lg shadow-lg"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
