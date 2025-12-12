import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 space-y-24">

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to StyleDecor
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            StyleDecor is your modern solution for home and ceremony decoration bookings. From in-studio consultations to on-site services and virtual sessions, we connect you with expert decorators and streamline your entire decoration journey.
          </p>
        </div>

        {/* Our Mission */}
        <motion.div
          className="bg-white p-16 rounded-2xl shadow-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            To provide a seamless and enjoyable decoration experience by connecting clients with skilled decorators, offering flexible booking options, and ensuring real-time project tracking for homes and ceremonies.
          </p>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          className="bg-gray-100 p-16 rounded-2xl shadow-inner text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Vision</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            To become the most trusted platform for decoration services, empowering local decorators and delivering unforgettable experiences for every client, whether on-site, in-studio, or virtually.
          </p>
        </motion.div>

        {/* Features / Highlights */}
        <div className="text-center space-y-12">
          <h2 className="text-4xl font-bold text-gray-800">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Booking", description: "Seamless booking of services and packages online." },
              { title: "Expert Decorators", description: "Connect with skilled decorators for all occasions." },
              { title: "Real-Time Updates", description: "Track your service status from assignment to completion." },
              { title: "Flexible Services", description: "Book on-site, in-studio, or virtual sessions." },
              { title: "Secure Payments", description: "Pay online safely and check your payment history." },
              { title: "Dashboard Control", description: "Role-based dashboards for users, decorators, and admins." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-blue-600 text-white p-16 rounded-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Book Your Decoration?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Explore our packages and connect with professional decorators to make your home or ceremony truly special.
          </p>
          <button className="btn btn-primary btn-lg">Book Decoration Service</button>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
