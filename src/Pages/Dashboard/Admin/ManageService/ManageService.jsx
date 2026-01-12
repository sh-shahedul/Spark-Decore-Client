import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Component/Loading/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

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

  // Format date without 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    });
  };

  // Delete service
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#005461",
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
      Swal.fire("Error!", "Failed to fetch service data.", "error");
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
        Swal.fire({
          title: "Updated!",
          text: "Service has been updated.",
          icon: "success",
          confirmButtonColor: "#005461",
        });
        refetch();
        serviceUpdateModal.current.close();
        setSelectedService(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update service.", "error");
    }
  };

  if (isLoading) return <Loading></Loading>

  return (
         <div className="min-h-screen bg-[#e6f3f5] dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-12">
          <title>spark decore | Manage Service</title>
           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-[#005461] dark:text-teal-400 text-center">
             Service Management <br /> <span className="text-[#FAB12F] dark:text-amber-400">Dashboard</span>
         </h2>
           <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm sm:text-xl">
                Manage, update and control all listed services from one place
           </p>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No services available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg dark:shadow-gray-900/50 rounded-xl bg-white dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-[#005461] dark:bg-teal-700 text-white">
              <tr>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">#</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Image</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Service Name</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Created At</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Category</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Cost (BDT)</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Unit</th>
                <th className="px-3 py-3 text-left text-xs sm:text-sm whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {services.map((service, index) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap dark:text-gray-300">{index + 1}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <img
                      src={service.image}
                      alt={service.service_name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="bg-purple-200 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 font-semibold px-2 py-1 rounded-full text-xs sm:text-sm">
                      {service.service_name}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-yellow-500 dark:text-yellow-400 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {formatDate(service.createdAt)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/40 px-2 py-1 rounded-full font-semibold text-xs sm:text-sm">
                      {service.service_category}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-green-600 dark:text-green-400 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {service.cost}
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-500 dark:text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                    {service.unit}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(service._id)}
                        className="bg-[#005461] dark:bg-teal-600 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-[#00414c] dark:hover:bg-teal-700 transition text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer"
                      >
                      <FaEdit />  Update
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 dark:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer"
                      >
                        <RiDeleteBin6Line /> Delete
                      </button>
                    </div>
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
          className="modal-box flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl dark:shadow-gray-900/50 max-w-lg w-full"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-2xl font-extrabold text-[#005461] dark:text-teal-400 text-center">
            Update Service
          </h3>

          {selectedService && (
            <>
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Service Name</label>
                <input
                  type="text"
                  name="service_name"
                  defaultValue={selectedService.service_name}
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    defaultValue={selectedService.cost}
                    className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Unit</label>
                  <select
                    name="unit"
                    defaultValue={selectedService.unit}
                    className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
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

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Category</label>
                <select
                  name="service_category"
                  defaultValue={selectedService.service_category}
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
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

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedService.description}
                  rows={5}
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedService.image}
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] dark:focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </>
          )}

          <div className="modal-action justify-end gap-4 flex flex-wrap">
            <button
              type="submit"
              className="bg-[#005461] dark:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-[#00414c] dark:hover:bg-teal-700 transition"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition"
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