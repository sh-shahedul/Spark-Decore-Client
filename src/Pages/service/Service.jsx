// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
  
// const Service = () => {
//      const axiosSecure = useAxiosSecure()
//     const {data:service = []} =useQuery({
//         queryKey: ['services'],
//         queryFn: async ()=>{
//         const res = await axiosSecure.get('/services')
//         return res.data
//         }
//     })
//     return (
//         <div>
//             <h1>service {service.length}</h1>
//         </div>
//     );
// };

// export default Service;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaEye } from 'react-icons/fa';
import Container from '../../Component/Container/Container';

const Service = () => {
  const axiosSecure = useAxiosSecure();
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    },
  });

  return (
    <section className="bg-gray-200 py-16">
      <Container>
        <div className=" px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-yellow-400 animate-pulse">
          Our Services
        </h1>
        <p className="text-gray-600 md:text-lg mb-12 font-semibold max-w-[700px] mx-auto text-center">
          Explore our wide range of premium decoration services, designed to make every space elegant and inspiring. Choose a service to see details.
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[400px] cursor-pointer"
              whileHover={{ scale: 1.05, y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-xl font-bold text-yellow-400 mb-3">
                    {service.service_name}
                  </h2>
                  <p className="text-gray-800 font-semibold mb-1">
                    Cost: {service.cost} BDT / {service.unit}
                  </p>
                  <p className="text-gray-500 mb-1">Category: {service.service_category}</p>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-4 w-full py-2 px-4 bg-yellow-400 text-black font-bold rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <FaEye /> View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </Container>
    </section>
  );
};

export default Service;
