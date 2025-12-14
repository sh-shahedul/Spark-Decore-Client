// // import { useQuery } from '@tanstack/react-query';
// // import React from 'react';
// // import useAxiosSecure from '../../hooks/useAxiosSecure';
  
// // const Service = () => {
// //      const axiosSecure = useAxiosSecure()
// //     const {data:service = []} =useQuery({
// //         queryKey: ['services'],
// //         queryFn: async ()=>{
// //         const res = await axiosSecure.get('/services')
// //         return res.data
// //         }
// //     })
// //     return (
// //         <div>
// //             <h1>service {service.length}</h1>
// //         </div>
// //     );
// // };

// // export default Service;
// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { motion } from 'framer-motion';
// import { FaEye } from 'react-icons/fa';
// import Container from '../../Component/Container/Container';

// const Service = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: services = [] } = useQuery({
//     queryKey: ['services'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/services');
//       return res.data;
//     },
//   });

//   return (
//     <section className="bg-gray-200 py-16">
//       <Container>
//         <div className=" px-4">
//         <h1 className="text-4xl font-bold text-center mb-4 text-pink-600 animate-pulse">
//           Our Services
//         </h1>
//         <p className="text-gray-600 md:text-lg mb-12 font-semibold max-w-[700px] mx-auto text-center">
//           Explore our wide range of premium decoration services, designed to make every space elegant and inspiring. Choose a service to see details.
//         </p>


//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[400px] cursor-pointer"
//               whileHover={{ scale: 1.05, y: -10 }}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: idx * 0.1 }}
//             >
//               {/* Image */}
//               <div className="h-48 w-full overflow-hidden rounded-t-3xl">
//                 <img
//                   src={service.image}
//                   alt={service.service_name}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-6 flex flex-col justify-between flex-1">
//                 <div>
//                   <h2 className="text-xl font-bold text-pink-600 mb-3">
//                     {service.service_name}
//                   </h2>
//                   <p className="text-gray-800 font-semibold mb-1">
//                     Cost: {service.cost} BDT / {service.unit}
//                   </p>
//                   <p className="text-gray-500 mb-1">Category: {service.service_category}</p>
//                 </div>

//                 {/* Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   className="mt-4 w-full py-2 px-4 bg-linear-to-r from-pink-500 to-red-500 text-white  font-bold  hover:from-pink-400 hover:via-red-500 hover:to-pink500 rounded-xl shadow-md flex items-center justify-center gap-2"
//                 >
//                   <FaEye /> View Details
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       </Container>
//     </section>
//   );
// };

// export default Service;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import ServiceCard from '../ServiceCard/ServiceCard';
import { Link } from 'react-router';

const Service = () => {
  const axiosSecure = useAxiosSecure();
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    },
  });

  const leftCards = services.filter((_, i) => i % 2 === 0);
  const rightCards = services.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-gray-200 py-16 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 w-full">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#005461] animate-pulse">
            Our Services
          </h1>
          <p className="text-gray-600 md:text-lg mb-12 font-semibold max-w-[700px] mx-auto">
            Explore our wide range of premium decoration services, designed to make every space elegant and inspiring.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 lg:gap-10 w-full">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 order-1">
           {leftCards.map((service) => (
              <ServiceCard key={service._id} service={service} />
                ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="hidden lg:flex flex-col items-center text-center order-2">
            <img
              src="https://i.pinimg.com/736x/46/1b/0a/461b0a2be1882d105b623acc38f6ac07.jpg"
              alt="Center Banner"
              className="rounded-3xl shadow-xl w-full h-[1100px] object-cover"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 order-3">
           {rightCards.map((service) => (
               <ServiceCard key={service._id} service={service} />
                ))}
          </div>

        </div>

        {/* ALL SERVICES BUTTON */}
        <div className="flex justify-center mt-5">
          <Link to='/service' className="px-8 py-3 bg-[#005461] text-white font-semibold rounded-xl shadow-md ">
            All Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Service;
