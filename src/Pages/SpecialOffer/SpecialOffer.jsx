// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router';
// const MotionLink = motion(Link);

// const SpecialOffer = () => {
//   return (
//     <section className="relative bg-gradient-to-r from-[#005461] to-[#FAB12F] py-20 overflow-hidden">
//       {/* Background animated circles */}
//       <motion.div 
//         className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse"
//         animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 4, repeat: Infinity }}
//       />
//       <motion.div 
//         className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse"
//         animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 5, repeat: Infinity }}
//       />

//       <div className="container mx-auto px-4 relative z-10 text-center">
//         <motion.h2 
//           className="text-4xl md:text-5xl font-bold text-white mb-6"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           🎉 Special Offer!
//         </motion.h2>

//         <motion.p 
//           className="text-lg md:text-2xl text-white mb-8"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           Get 20% off on Holud Night & Wedding Decoration Services
//         </motion.p>

//         <MotionLink
//           className="bg-white text-[#005461] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#005461] hover:text-white transition-colors duration-300"
//           whileHover={{ scale: 1.1, rotate: 360 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Book Now
//         </MotionLink>
//       </div>
//     </section>
//   );
// };

// export default SpecialOffer;


import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const MotionLink = motion(Link);

const SpecialOffer = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#005461] to-[#FAB12F] py-20 overflow-hidden">
      {/* Background animated circles */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          🎉 Special Offer!
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl text-white mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Get 20% off on Holud Night & Wedding Decoration Services
        </motion.p>

        {/* 🔥 Motion Link */}
        <MotionLink
          to="/service"
          className="inline-block bg-white text-[#005461] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#005461] hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
        >
          Book Now
        </MotionLink>
      </div>
    </section>
  );
};

export default SpecialOffer;
