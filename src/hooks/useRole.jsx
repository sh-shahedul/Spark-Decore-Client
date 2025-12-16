// import { useState, useEffect } from "react";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";


// const useRole = () => {
//   const {user} = useAuth()
//   console.log(user);
//    const axiosSecure = useAxiosSecure()
//   const [role, setRole] = useState("user");
//   const [roleLoading, setRoleLoading] = useState(true);

//   useEffect(() => {
//     const fetchRole = async () => {
//       if (!user?.email) {
//         setRoleLoading(false);
//         return;
//       }

//       try {
//         const res = await axiosSecure.get(`/users/${user.email}`); 
//        console.log();
//         setRole(res.data?.role || "");

//       } catch (err) {
//         console.error("Error fetching user role:", err);
//         setRole("user");
//       } finally {
//         setRoleLoading(false);
//       }
//     };

//     fetchRole();
     
//   }, [user, axiosSecure]);
    
//   return { role, roleLoading };
// };

// export default useRole;


import React from 'react';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {isLoading: roleLoading, data: role = "" } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email?email=${user?.email}`);
            return res.data?.role || "";
        }
    })



    return { role , roleLoading };
};

export default useRole;