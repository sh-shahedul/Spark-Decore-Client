import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageService = () => {
  const axiosSecure = useAxiosSecure();
  const serviceUpdateModal = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch all services
  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services/all");
      return res.data;
    },
  });

  // Delete service
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          }
        });
      }
    });
  };

  // Open update modal & prefill data
  const handleUpdate = async (id) => {
    try {
      const res = await axiosSecure.get(`/services/${id}`);
      setSelectedService(res.data);
      serviceUpdateModal.current.showModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Submit update form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const updatedData = {
        service_name: form.service_name.value,
        service_category: form.service_category.value,
        cost: parseFloat(form.cost.value),
        unit: form.unit.value,
        description: form.description.value,
        image: form.image.value,
      };

      const res = await axiosSecure.patch(
        `/services/${selectedService._id}`,
        updatedData
      );

      if (res.data.modifiedCount) {
        Swal.fire("Updated!", "Service has been updated.", "success");
        refetch();
        serviceUpdateModal.current.close();
        setSelectedService(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update service.", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading services...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        All Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-pink-600 text-white text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Cost</th>
                <th className="px-4 py-2">Unit</th>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{service.service_name}</td>
                  <td className="px-4 py-2">{service.service_category}</td>
                  <td className="px-4 py-2">{service.cost}</td>
                  <td className="px-4 py-2">{service.unit}</td>
                  <td className="px-4 py-2">{service.createdByEmail}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      <dialog
        ref={serviceUpdateModal}
        className="modal modal-bottom sm:modal-middle backdrop:bg-black/30"
        onClose={() => setSelectedService(null)}
      >
        <form
          method="dialog"
          className="modal-box flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-2xl"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-2xl font-extrabold text-gray-800 text-center">
            Update Service
          </h3>

          {selectedService && (
            <>
              {/* Service Name */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Service Name</label>
                <input
                  type="text"
                  name="service_name"
                  defaultValue={selectedService.service_name}
                  placeholder="Service Name"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  required
                />
              </div>

              {/* Cost & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    defaultValue={selectedService.cost}
                    placeholder="60000"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Unit</label>
                  <select
                    name="unit"
                    defaultValue={selectedService.unit}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                    required
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
                  name="service_category"
                  defaultValue={selectedService.service_category}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  required
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
                  name="description"
                  defaultValue={selectedService.description}
                  placeholder="Describe your service here..."
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedService.image}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="modal-action justify-end gap-4">
            <button
              type="submit"
              className="bg-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-700 transition-colors shadow-lg"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition-colors"
              onClick={() => serviceUpdateModal.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ManageService;
