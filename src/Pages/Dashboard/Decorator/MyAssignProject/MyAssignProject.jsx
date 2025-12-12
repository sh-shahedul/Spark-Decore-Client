import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MyAssignProject = () => {
   const axiosSecure = useAxiosSecure()
   const {user} = useAuth()
  const {data: assignDeco =[]} = useQuery({
         queryKey:['bookings'],
         queryFn: async () =>{
          const res = await axiosSecure.get(`/bookings/assignDecoratore?email=${user.email}`)
          return res.data
         }
  })
  return (
    <div>
      <h1>dssdf {assignDeco.length}</h1>
    </div>
  );
};

export default MyAssignProject;