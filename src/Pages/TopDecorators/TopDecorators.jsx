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

  const { data: decorators = [], isLoading, error } = useQuery({
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
    <Container>
      <div className="py-12 lg:py-16">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#005461] mb-2">
            Top Decorators
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Meet our highly rated professional decorators
          </p>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination, EffectCoverflow]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {decorators.map((decorator) => (
            <SwiperSlide key={decorator._id}>
              <div className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:border-[#FAB12F] transition-all duration-500 transform hover:-translate-y-2 mb-12">
                
                {/* Image Container with Badge */}
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={decorator.photoURL || "https://via.placeholder.com/300"}
                    alt={decorator.name}
                    className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 right-3 bg-[#FAB12F] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Top Rated
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#005461] group-hover:text-[#FAB12F] transition-colors duration-300">
                    {decorator.name}
                  </h3>

                  {/* Specialty */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="bg-[#005461]/10 p-2 rounded-lg">
                      <HiOutlineBriefcase className="text-[#005461] text-lg" />
                    </div>
                    <span className="text-sm font-medium">
                      {decorator.specialty || "Professional Decorator"}
                    </span>
                  </div>

                  {/* Rating with Stars */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(decorator.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-[#005461] bg-yellow-50 px-3 py-1 rounded-full">
                      {decorator.rating}
                    </span>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default TopDecorators;