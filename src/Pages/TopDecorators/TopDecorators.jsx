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
    <div className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative Elements */}
       <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 dark:bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 dark:bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div> 
      
      <Container>
        <div className="py-16 lg:py-24 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-block">
              <span className="bg-gradient-to-r from-[#005461] to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                ⭐ Featured Professionals
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#005461] via-teal-600 to-[#005461] dark:from-teal-400 dark:via-teal-500 dark:to-teal-400 bg-clip-text text-transparent mb-3">
              Top Decorators
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover our most talented and highly-rated decoration experts
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#FAB12F] dark:to-amber-400 rounded-full"></div>
              <div className="h-1 w-8 bg-[#FAB12F] dark:bg-amber-400 rounded-full"></div>
              <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#FAB12F] dark:to-amber-400 rounded-full"></div>
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
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-500 p-5 mb-12 group overflow-hidden max-w-xs mx-auto">
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-amber-500/5 dark:from-teal-400/10 dark:to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#005461] via-[#FAB12F] to-[#005461] dark:from-teal-500 dark:via-amber-400 dark:to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Avatar Section */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        {/* Rotating Ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#005461] via-[#FAB12F] to-[#005461] dark:from-teal-500 dark:via-amber-400 dark:to-teal-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                        
                        {/* Image Container */}
                        <div className="relative m-1">
                          <img
                            src={
                              decorator.photoURL ||
                              "https://via.placeholder.com/150"
                            }
                            alt={decorator.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Top Badge */}
                        <div className="absolute -top-1 -right-1 bg-gradient-to-br from-[#FAB12F] to-amber-500 dark:from-amber-400 dark:to-amber-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                          ⭐ TOP
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-[#005461] dark:text-teal-400 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#005461] group-hover:to-teal-600 dark:group-hover:from-teal-400 dark:group-hover:to-teal-500 group-hover:bg-clip-text transition-all duration-300 text-center mb-2">
                      {decorator.name}
                    </h3>

                    {/* Specialty Badge */}
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-800/40 dark:group-hover:to-teal-700/40 transition-colors duration-300">
                        <HiOutlineBriefcase className="text-[#005461] dark:text-teal-400 text-sm" />
                        <span className="text-xs font-semibold text-[#005461] dark:text-teal-400">
                          {decorator.specialty || "Professional Decorator"}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FAB12F] dark:via-amber-400 to-transparent mx-auto mb-3"></div>

                    {/* Rating Section */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-3 group-hover:shadow-inner transition-shadow duration-300">
                      <div className="flex items-center justify-center gap-1 mb-1.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm transition-all duration-300 ${
                              i < Math.floor(decorator.rating)
                                ? "text-yellow-400 drop-shadow-md group-hover:scale-110"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#005461] to-teal-600 dark:from-teal-400 dark:to-teal-500 bg-clip-text text-transparent">
                          {decorator.rating}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                          / 5.0
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50/50 dark:from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
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