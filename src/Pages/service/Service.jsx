import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
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



  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 w-full overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-50/20 to-amber-50/20 rounded-full blur-3xl"></div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 w-full relative z-10">

        {/* Title Section with Enhanced Design */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-[#005461] to-teal-600 text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-wider shadow-lg">
              ✨ What We Offer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#005461] via-teal-600 to-[#FAB12F] bg-clip-text text-transparent"
          >
            Our Premium Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Explore our wide range of premium decoration services, designed to make every space elegant and inspiring. Transform your vision into reality with our expert touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#FAB12F] rounded-full"></div>
            <div className="h-1.5 w-10 bg-[#FAB12F] rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#FAB12F] rounded-full"></div>
          </motion.div>
        </div>

        {/* Services Grid - 3 Columns Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.9 + (index * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ y: -8 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 "
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "50+", label: "Services" },
            { number: "1000+", label: "Projects Done" },
            { number: "98%", label: "Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-100"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#005461] to-teal-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ALL SERVICES BUTTON with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="flex justify-center"
        >
          <Link
            to='/service'
            className="group relative px-10 py-4 bg-gradient-to-r from-[#005461] to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center gap-3">
              View All Services
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#005461] to-[#FAB12F]"
                style={{
                  animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`
                }}
              ></div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Service;