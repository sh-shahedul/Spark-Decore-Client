import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Calendar, 
  UserCheck, 
  CreditCard, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ChevronDown
} from "lucide-react";
import Container from "../../Component/Container/Container";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse Services",
      description: "Explore our decoration packages and services for home, wedding, corporate events and more."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Select Date & Time",
      description: "Choose your preferred date and time slot that fits your schedule perfectly."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Check Decorator Availability",
      description: "View decorator's expertise, ratings and availability before booking."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Make Payment",
      description: "Securely pay for your selected package through our integrated payment system."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Assignment",
      description: "Admin assigns the best decorator team for your on-site service."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your project status from planning to completion in real-time."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Service Completed",
      description: "Receive final confirmation and enjoy your beautifully decorated space."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
     <Container>
         <div className=" px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#005461] mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Simple steps to transform your space with our professional decoration services
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 h-full border-t-4 border-[#FAB12F] hover:shadow-2xl transition-all duration-300">
                {/* Step Number */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -left-4 w-10 h-10 bg-[#005461] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
                >
                  {index + 1}
                </motion.div>

                {/* Icon */}
                <div className="flex justify-center mb-4 mt-2">
                  <motion.div 
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-[#FAB12F]/20 rounded-full flex items-center justify-center text-[#005461]"
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-[#005461] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="hidden xl:block absolute top-1/3 -right-4 w-8 h-0.5 bg-[#FAB12F] origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Service Status Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10"
        >
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-[#005461] mb-6 text-center"
          >
            On-Site Service Status Tracking
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {["Assigned", "Planning Phase", "Materials Prepared", "On the Way", "Setup in Progress", "Completed"].map((status, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#005461] text-white rounded-full text-xs sm:text-sm font-semibold shadow-md"
                >
                  {status}
                </motion.div>
                {index < 5 && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#FAB12F] mx-1 sm:mx-2 transform rotate-[-90deg]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
     </Container>
    </section>
  );
};

export default HowItWorks;