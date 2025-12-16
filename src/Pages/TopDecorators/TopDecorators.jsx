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
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Top Decorators
        </h2>

        <Swiper
          effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
       
          slidesPerView={3}
          spaceBetween={30}
         
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
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination,EffectCoverflow]}
         
        >
          {decorators.map((decorator) => (
           <SwiperSlide key={decorator._id}>
  <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">

    {/* Image */}
    <div className="overflow-hidden rounded-lg">
      <img
        src={decorator.photoURL || "https://via.placeholder.com/300"}
        alt={decorator.name}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    {/* Name */}
    <h3 className="mt-3 text-lg font-semibold text-gray-800">
      {decorator.name}
    </h3>

    {/* Specialty */}
    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
      <HiOutlineBriefcase className="text-gray-400" />
      <span>{decorator.specialty || "Professional Decorator"}</span>
    </div>

    {/* Rating */}
    <div className="flex items-center gap-1 mt-2">
      <FaStar className="text-yellow-500 text-sm" />
      <span className="text-sm font-medium text-gray-700">
        {decorator.rating}
      </span>
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
