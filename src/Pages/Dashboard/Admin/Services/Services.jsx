import React, { useRef } from "react";
import { useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllServices = () => {
  const axiosSecure = useAxiosSecure();
    const serviceUpdateModal  = useRef(null)

  // Fetch services using react-query
  const { data: services = [], isLoading,refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
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
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axiosSecure.delete(`/services/${id}`)
       .then(res=>{
        console.log(res.data);

        if(res.data.deletedCount){
            refetch()
            Swal.fire({
         title: "Deleted!",
         text: "Your file has been deleted.",
         icon: "success"
       });
          }
        
         })
  }
});
   
  };

  const handleUpdate = (id) => {
   serviceUpdateModal.current.showModal(id)
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading services...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Services</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
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
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

   
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
<dialog ref={serviceUpdateModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default AllServices;
