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
      cost: parseFloat(data.cost), // ensure cost is number
      createdByEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    axiosSecure.post("/services", payload)
      .then(res => {
        if (res.data.insertedId) {
          alert("Service added successfully!");
          reset();
        }
      })
      .catch(err => {
        console.log("Error adding service:", err);
        alert("Failed to add service");
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Service Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Service Name</label>
          <input
            {...register("service_name", { required: true })}
            placeholder="Outdoor Holud Night Event"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Cost & Unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Cost</label>
            <input
              type="number"
              {...register("cost", { required: true })}
              placeholder="60000"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Unit</label>
            <select
              {...register("unit", { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
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
          <label className="block mb-1 font-semibold text-gray-700">Category</label>
          <select
            {...register("service_category", { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
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
          <label className="block mb-1 font-semibold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Describe your service here..."
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Image URL</label>
          <input
            {...register("image", { required: true })}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition-colors text-lg"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
