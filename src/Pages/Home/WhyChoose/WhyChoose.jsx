import React from 'react';
import { FaUserTie, FaCalendarCheck, FaDollarSign, FaHandsHelping, FaSmile } from 'react-icons/fa';
import { Link } from 'react-router';
import Container from '../../../Component/Container/Container';

const features = [
  {
    icon: <FaUserTie size={40} className="text-amber-400" />,
    title: 'Professional Decorators',
    description: 'Experienced team for home & ceremony decoration. Personalized service for every client.',
  },
  {
    icon: <FaCalendarCheck size={40} className="text-yellow-400" />,
    title: 'Smart Booking System',
    description: 'Online appointment booking, hassle-free. Check availability and book instantly.',
  },
  {
    icon: <FaDollarSign size={40} className="text-yellow-400" />,
    title: 'Transparent Pricing',
    description: 'Clear cost structure for every package. No hidden charges.',
  },
  {
    icon: <FaHandsHelping size={40} className="text-yellow-400" />,
    title: 'End-to-End Service',
    description: 'From consultation to setup completion. Real-time project updates.',
  },
  {
    icon: <FaSmile size={40} className="text-yellow-400" />,
    title: 'High Customer Satisfaction',
    description: 'Rated highly by clients. Reviews and testimonials to build trust.',
  },
];

const WhyChoose = () => {
  return (
    <div className="py-16 bg-base-200 mb-10 rounded-2xl">
      <Container>
        <div className="text-center mb-12 ">
        <h2 className=" text-4xl md:text-5xl text-yellow-400 mb-4 font-bold">
          Why Choose <span className="text-black">Spark Decor</span>
        </h2>
        <p className="max-w-2xl mx-auto  text-lg md:text-base font-semibold">
          We combine creativity, professionalism, and modern technology to make your dream space come alive.
        </p>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group perspective">
              <div className="relative w-full h-64 transition-transform duration-[2000ms] ease-in-out transform-style-3d group-hover:rotate-y-180">

                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-lg transform-style-3d transition-transform duration-700 ease-in-out">
                  <div className="text-5xl mb-4 transform transition-transform duration-700 ease-in-out group-hover:translate-z-12">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-400 transform transition-transform duration-700 ease-in-out group-hover:translate-z-12">
                    {feature.title}
                  </h3>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden bg-yellow-400 text-white rounded-xl flex flex-col items-center justify-center p-6 rotate-y-180 text-lg font-semibold text-center transform-style-3d transition-transform duration-700 ease-in-out">
                  <p className="transform transition-transform duration-700 ease-in-out group-hover:translate-z-12">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .translate-z-12 {
          transform: translateZ(40px);
        }
        .group:hover .group-hover\\:translate-z-12 {
          transform: translateZ(60px);
        }
      `}</style>
      </Container>
    </div>
  );
};

export default WhyChoose;
