// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
// import { FaStar } from "react-icons/fa";
// import { HiOutlineBriefcase } from "react-icons/hi";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../Component/Loading/Loading";
// import Container from "../../Component/Container/Container";

// const TopDecorators = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: decorators = [], isLoading, error } = useQuery({
//     queryKey: ["topDecorators"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users/decorators/top");
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loading />;
//   if (error) return <p>Error loading decorators</p>;
//   if (!decorators.length) return <p>No decorators found</p>;

//   return (
//     <Container>
//       <div className="py-12 lg:py-16">
//         {/* Section Header */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-[#005461] mb-2">
//             Top Decorators
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base">
//             Meet our highly rated professional decorators
//           </p>
//         </div>

//         <Swiper
//           effect={'coverflow'}
//           grabCursor={true}
//           centeredSlides={true}
//           slidesPerView={1}
//           spaceBetween={20}
//           loop={true}
//           coverflowEffect={{
//             rotate: 50,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           autoplay={{
//             delay: 1500,
//             disableOnInteraction: false,
//           }}
//           pagination={{ 
//             clickable: true,
//             dynamicBullets: true,
//           }}
//           modules={[Autoplay, Pagination, EffectCoverflow]}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 30,
//             },
//           }}
//         >
//           {decorators.map((decorator) => (
//             <SwiperSlide key={decorator._id}>
//               <div className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-[#FAB12F] transition-all duration-500 transform hover:-translate-y-2 mb-12">
                
//                 {/* Image Container with Badge */}
//                 <div className="relative overflow-hidden rounded-xl mb-4">
//                   <img
//                     src={decorator.photoURL || "https://via.placeholder.com/300"}
//                     alt={decorator.name}
//                     className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
                  
//                   {/* Top Badge */}
//                   <div className="absolute top-3 right-3 bg-[#FAB12F] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
//                     Top Rated
//                   </div>

//                   {/* Overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>

//                 {/* Content */}
//                 <div className="space-y-3">
//                   {/* Name */}
//                   <h3 className="text-xl font-bold text-[#005461] group-hover:text-[#FAB12F] transition-colors duration-300">
//                     {decorator.name}
//                   </h3>

//                   {/* Specialty */}
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <div className="bg-[#005461]/10 p-2 rounded-lg">
//                       <HiOutlineBriefcase className="text-[#005461] text-lg" />
//                     </div>
//                     <span className="text-sm font-medium">
//                       {decorator.specialty || "Professional Decorator"}
//                     </span>
//                   </div>

//                   {/* Rating with Stars */}
//                   <div className="flex items-center justify-between pt-2 border-t border-gray-200">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <FaStar
//                           key={i}
//                           className={`text-sm ${
//                             i < Math.floor(decorator.rating)
//                               ? "text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-lg font-bold text-[#005461] bg-yellow-50 px-3 py-1 rounded-full">
//                       {decorator.rating}
//                     </span>
//                   </div>
//                 </div>

//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </Container>
//   );
// };

// export default TopDecorators;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading/Loading";
import Container from "../../Component/Container/Container";

const TopDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: decorators = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topDecorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/decorators/top");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading decorators</p>;
  if (!decorators.length) return <p>No decorators found</p>;

  return (
    <div className="relative bg-gradient-to-br from-teal-50 via-white to-amber-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      
      <Container>
        <div className="py-16 lg:py-24 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-[#005461] to-teal-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                ⭐ Featured Professionals
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#005461] via-teal-600 to-[#005461] bg-clip-text text-transparent mb-3">
              Top Decorators
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our most talented and highly-rated decoration experts
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#FAB12F] rounded-full"></div>
              <div className="h-1 w-8 bg-[#FAB12F] rounded-full"></div>
              <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#FAB12F] rounded-full"></div>
            </div>
          </div>

          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1}
            loop
            spaceBetween={50}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-14"
          >
            {decorators.map((decorator) => (
              <SwiperSlide key={decorator._id}>
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-5 mb-12 group overflow-hidden max-w-xs mx-auto">
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#005461] via-[#FAB12F] to-[#005461] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar Section */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        {/* Rotating Ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#005461] via-[#FAB12F] to-[#005461] animate-spin" style={{ animationDuration: '3s' }}></div>
                        
                        {/* Image Container */}
                        <div className="relative m-1">
                          <img
                            src={
                              decorator.photoURL ||
                              "https://via.placeholder.com/150"
                            }
                            alt={decorator.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Top Badge */}
                        <div className="absolute -top-1 -right-1 bg-gradient-to-br from-[#FAB12F] to-amber-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                          ⭐ TOP
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-[#005461] group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#005461] group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300 text-center mb-2">
                      {decorator.name}
                    </h3>

                    {/* Specialty Badge */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 group-hover:from-teal-100 group-hover:to-teal-200 transition-colors duration-300">
                        <HiOutlineBriefcase className="text-[#005461] text-sm" />
                        <span className="text-xs font-semibold text-[#005461]">
                          {decorator.specialty || "Professional Decorator"}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FAB12F] to-transparent mx-auto mb-3"></div>

                    {/* Rating Section */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 group-hover:shadow-inner transition-shadow duration-300">
                      <div className="flex items-center justify-center gap-1 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm transition-all duration-300 ${
                              i < Math.floor(decorator.rating)
                                ? "text-yellow-400 drop-shadow-md group-hover:scale-110"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#005461] to-teal-600 bg-clip-text text-transparent">
                          {decorator.rating}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          / 5.0
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default TopDecorators;
