import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Container from "../../../Component/Container/Container";
import { Link } from "react-router";

const slides = [
  {
    title: ["Wedding Decoration"],
    description: "Make your special day absolutely unforgettable with breathtaking, elegant, and luxurious decorations that transform every corner into a magical wonderland, creating memories that last a lifetime.",
    image: "https://i.ibb.co/hF3WvbGK/ww.webp",
  },
  {
    title: ["Birthday Party"],
    description: "Celebrate your birthday in a spectacular way with vibrant, colorful, and fun-filled decorations that light up every moment, making your party truly extraordinary and joyfully unforgettable.",
    image: "https://i.ibb.co/8n8N8VJN/birt.jpg",
  },
  {
    title: ["Corporate Event"],
    description: "Host professional and impressive corporate events with stunning setups, seamless arrangements, and stylish decorations that leave a lasting impact on your guests and elevate your brand image.",
    image: "https://i.ibb.co/LfYnPWM/wed.jpg",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full bg-base-200">
     <Container>
       <div className="">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-0"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    <Typewriter
                      words={slide.title}
                      loop={true}
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-6 max-w-4xl px-4">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <Link to='/service' className="px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 rounded-lg bg-[#005461] hover:text-[#005461] text-white text-sm sm:text-base font-bold hover:bg-[#FAB12F] transition-colors duration-300">
                      Book Decoration Service
                    </Link>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
     </Container>
    </section>
  );
};

export default HeroSection;