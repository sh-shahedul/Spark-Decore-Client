// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";


// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   // Fetch users with react-query
//   const {data: users = [],isLoading} = useQuery({
//     queryKey:['users'],
//     queryFn: async()=>{
//        const res = await axiosSecure.get('/users')
//         return res.data
//     }
//   })
//    console.log(users);
//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Users {users.length}</h2>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 border">Photo</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, idx) => (
//               <tr key={idx} className="text-center border">
//                 <td className="px-4 py-2 border">
//                   <img
//                     src={user?.photoURL}
//                     alt={user?.displayName}
//                     className="w-12 h-12 rounded-full mx-auto"
//                   />
//                 </td>
//                 <td className="px-4 py-2 border">{user?.displayName}</td>
//                 <td className="px-4 py-2 border">{user?.email}</td>
//                 <td className="px-4 py-2 border">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeDecorator = async (userId) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`);
      if (res.data.message) {
        toast.success(res.data.message);
        queryClient.invalidateQueries(["users"]); // Refresh users
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users ({users.length})</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Photo</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="text-center border">
                <td className="px-4 py-2 border">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border">{user?.displayName}</td>
                <td className="px-4 py-2 border">{user?.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">
                  {user.role === "user" && (
                    <button
                      onClick={() => handleMakeDecorator(user._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Make Decorator
                    </button>
                  )}
                  {user.role === "decorator" && (
                    <span className="text-green-600 font-semibold">Decorator</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

