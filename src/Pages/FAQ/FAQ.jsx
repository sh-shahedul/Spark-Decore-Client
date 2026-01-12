import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Calendar, MapPin, CreditCard, Users, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      icon: Calendar,
      question: "How far in advance should I book my decoration service?",
      answer: "We recommend booking at least 2-3 weeks in advance for regular events. For peak seasons (weddings, festivals), booking 1-2 months ahead ensures availability. However, we do our best to accommodate last-minute requests based on decorator availability."
    },
    {
      icon: MapPin,
      question: "Do you provide both in-studio and on-site decoration services?",
      answer: "Yes! We offer both options. In-studio decorations are perfect for photoshoots and controlled environments. On-site services bring our creativity directly to your venue - whether it's your home, office, or event space. Pricing varies based on location and setup complexity."
    },
    {
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer: "We accept multiple payment options including credit/debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. A 30% advance payment secures your booking, with the remaining balance due before the event. All transactions are secure and processed through our encrypted payment gateway."
    },
    {
      icon: Users,
      question: "Can I customize the decoration package according to my preferences?",
      answer: "Absolutely! Every event is unique. After booking, you'll be assigned a dedicated decorator who will discuss your vision, theme preferences, color schemes, and budget. We create personalized mood boards and provide multiple options before finalizing the design."
    },
    {
      icon: Clock,
      question: "How long does the setup and teardown take?",
      answer: "Setup time varies by project complexity - simple decorations take 2-3 hours, while elaborate setups may require 6-8 hours or more. We typically arrive 4-6 hours before your event starts. Teardown is included in our service and usually takes 1-2 hours after your event concludes."
    },
    {
      icon: Shield,
      question: "What's your cancellation and refund policy?",
      answer: "Cancellations made 14+ days before the event receive a 90% refund. 7-13 days prior: 50% refund. Less than 7 days: advance payment is non-refundable. However, you can reschedule once without penalty if done at least 7 days in advance, subject to decorator availability."
    },
    {
      icon: Sparkles,
      question: "Do you provide decoration materials or do I need to arrange them?",
      answer: "We provide all decoration materials as part of our service packages! This includes flowers, balloons, fabrics, lighting, props, and accessories. You don't need to worry about sourcing anything. We use high-quality materials and can also incorporate any personal items you'd like to include."
    },
    {
      icon: Calendar,
      question: "Can I track my decorator's progress and arrival time?",
      answer: "Yes! Once your booking is confirmed and a decorator is assigned, you can track the project status through your dashboard. You'll see stages like 'Planning', 'Materials Prepared', 'On The Way', and 'Setup in Progress'. Our decorators communicate directly and provide real-time updates on the day of your event."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" max-w-screen-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-[#FAB12F] dark:text-[#FFD700] mx-auto" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-[#005461] dark:text-[#4DD4E8]  bg-clip-text text-transparent">
              Frequently Asked
            </span>
            {/* <br /> */}
            <span className="text-[#FAB12F] "> Questions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about Spark Decore's decoration services
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    isOpen ? 'ring-2 ring-[#FAB12F] dark:ring-[#FFD700]' : ''
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="p-6 flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: isOpen ? 360 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isOpen
                          ? 'bg-gradient-to-br from-[#005461] to-[#FAB12F] dark:from-[#4DD4E8] dark:to-[#FFD700]'
                          : 'bg-gray-100 dark:bg-slate-700'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 pr-8">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-6 h-6 ${isOpen ? 'text-[#FAB12F] dark:text-[#FFD700]' : 'text-gray-400 dark:text-gray-500'}`} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 pl-[88px]">
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            className="w-12 h-1 bg-gradient-to-r from-[#005461] to-[#FAB12F] dark:from-[#4DD4E8] dark:to-[#FFD700] rounded-full mb-4"
                          />
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#FAB12F] to-[#005461]  rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Our friendly team is here to help! Reach out and we'll get back to you within 24 hours.
            </p>
          <Link to="/contact">
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#005461]  font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Support
            </motion.button> 
          </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;