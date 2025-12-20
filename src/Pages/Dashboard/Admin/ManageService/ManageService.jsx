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
         <div className="min-h-screen bg-[#e6f3f5] py-8 px-4 sm:px-6 lg:px-12">
          <title>spark decore | Manage Service</title>
           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-[#005461] text-center">
             Service Management <br /> <span className="text-[#FAB12F]">Dashboard</span>
         </h2>
           <p className="text-center text-gray-500 mb-8 text-sm sm:text-xl">
                Manage, update and control all listed services from one place
           </p>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No services available.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#005461] text-white">
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
            <tbody className="divide-y divide-gray-100">
              {services.map((service, index) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{index + 1}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <img
                      src={service.image}
                      alt={service.service_name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="bg-purple-200 text-purple-600 font-semibold px-2 py-1 rounded-full text-xs sm:text-sm">
                      {service.service_name}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-yellow-500 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {formatDate(service.createdAt)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-sky-600 bg-sky-100 px-2 py-1 rounded-full font-semibold text-xs sm:text-sm">
                      {service.service_category}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-green-600 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {service.cost}
                  </td>
                  <td className="px-3 py-2 font-semibold text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                    {service.unit}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(service._id)}
                        className="bg-[#005461] text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-[#00414c] transition text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer"
                      >
                      <FaEdit />  Update
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs sm:text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer"
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
          className="modal-box flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-2xl max-w-lg w-full"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-2xl font-extrabold text-[#005461] text-center">
            Update Service
          </h3>

          {selectedService && (
            <>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Service Name</label>
                <input
                  type="text"
                  name="service_name"
                  defaultValue={selectedService.service_name}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    defaultValue={selectedService.cost}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Unit</label>
                  <select
                    name="unit"
                    defaultValue={selectedService.unit}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
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
                <label className="block mb-2 font-semibold text-gray-700">Category</label>
                <select
                  name="service_category"
                  defaultValue={selectedService.service_category}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
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
                <label className="block mb-2 font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedService.description}
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedService.image}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#005461] focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          <div className="modal-action justify-end gap-4 flex flex-wrap">
            <button
              type="submit"
              className="bg-[#005461] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#00414c] transition"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-400 transition"
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