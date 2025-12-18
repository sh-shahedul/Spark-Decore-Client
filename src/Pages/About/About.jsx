import { motion } from 'framer-motion';
import { 
  FaBullseye, FaEye, FaRocket, 
  FaUsers, FaHandshake, FaAward,
  FaCalendarCheck, FaHome, FaPaintBrush,
  FaClock, FaStar, FaShieldAlt,
  FaCheckCircle, FaHeart
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from '../../Component/Container/Container';
import Loading from '../../Component/Loading/Loading';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const [loading, setLoading] = useState(true);


  // GSAP animations for scroll-triggered elements
  useEffect(() => {
    gsap.fromTo('.mission-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.mission-section',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.value-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 70%',
        }
      }
    );
  }, []);

  // Framer Motion variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const teamMembers = [
  { 
    name: "Sarah Chen", 
    role: "Creative Director", 
    experience: "10+ years", 
    specialty: "Wedding Decor",
    image: "https://randomuser.me/api/portraits/women/65.jpg" 
  },
  { 
    name: "Marcus Johnson", 
    role: "Lead Decorator", 
    experience: "8 years", 
    specialty: "Modern Interiors",
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    name: "Priya Sharma", 
    role: "Event Specialist", 
    experience: "6 years", 
    specialty: "Ceremony Decor",
    image: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    name: "David Wilson", 
    role: "Operations Head", 
    experience: "12 years", 
    specialty: "Logistics",
    image: "https://randomuser.me/api/portraits/men/21.jpg" 
  },
];

  const values = [
    { icon: <FaStar />, title: "Excellence", desc: "Uncompromising quality in every project" },
    { icon: <FaHeart />, title: "Passion", desc: "Love for transforming spaces" },
    { icon: <FaHandshake />, title: "Integrity", desc: "Honest pricing and transparent processes" },
    { icon: <FaUsers />, title: "Collaboration", desc: "Working closely with clients" },
    { icon: <FaShieldAlt />, title: "Reliability", desc: "Consistent, dependable service" },
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Skilled Decorators" },
    { number: "24/7", label: "Support Available" },
  ];
  useEffect(() => {
  setLoading(false);
}, []);
 if(loading) return <Loading></Loading>
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005461]/10 to-[#FAB12F]/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 mt-5">
              <span className="text-[#005461]">Transforming</span>{' '}
              <span className="text-[#FAB12F]">Spaces,</span>{' '}
              <span className="text-[#005461]">Creating</span>{' '}
              <span className="text-[#FAB12F]">Memories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 ">
              At StyleDecor, we believe every space tells a story. We're dedicated to turning 
              your vision into reality with professional decoration services for homes and ceremonies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#005461] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 mission-section">
        <Container>
          <div className="container mx-auto ">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mission-card bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#005461]"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-[#005461]/10 mr-4">
                  <FaBullseye className="text-3xl text-[#005461]" />
                </div>
                <h2 className="text-3xl font-bold text-[#005461]">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the decoration industry by providing seamless, technology-driven 
                appointment management and exceptional decoration services. We aim to eliminate 
                waiting times and bring professional decoration services to every home and event 
                with just a few clicks.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mission-card bg-white rounded-2xl p-8 shadow-xl border-l-4 border-[#FAB12F]"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-[#FAB12F]/10 mr-4">
                  <FaEye className="text-3xl text-[#FAB12F]" />
                </div>
                <h2 className="text-3xl font-bold text-[#FAB12F]">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the leading platform for decoration services nationwide, known for 
                innovation, reliability, and transforming spaces into beautiful, functional 
                environments that inspire and delight.
              </p>
            </motion.div>
          </div>
        </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-r from-[#005461]/5 to-[#FAB12F]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-[#005461] mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                StyleDecor began with a simple observation: local decoration businesses were 
                struggling with inefficiencies. Walk-in crowds, endless waiting times, and 
                chaotic scheduling were the norms rather than exceptions.
              </p>
              <p>
                Founded in 2018 by a team of interior designers and tech enthusiasts, we set 
                out to create a solution. What started as a small studio with three decorators 
                has grown into a comprehensive platform serving hundreds of clients monthly.
              </p>
              <p>
                Today, StyleDecor combines decades of decoration expertise with cutting-edge 
                technology to deliver exceptional experiences for both our clients and decorators.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 values-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#005461] mb-12">
            Our Core Values
          </h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="value-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-[#005461]/20 to-[#FAB12F]/20 mb-4">
                    <div className="text-2xl text-[#005461]">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#005461] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
       <Container>
         <div className="container mx-auto ">
          <h2 className="text-4xl font-bold text-center text-[#005461] mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our team combines creative vision with technical expertise to deliver 
            exceptional decoration experiences
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#005461] to-[#FAB12F] mx-auto mb-4 flex items-center justify-center">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full"/>
                  {/* <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span> */}
                </div>
                <h3 className="text-xl font-bold text-center text-[#005461] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#FAB12F] text-center font-semibold mb-2">
                  {member.role}
                </p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-gray-600">
                    <FaAward className="mr-2 text-[#005461]" />
                    <span>{member.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPaintBrush className="mr-2 text-[#005461]" />
                    <span>{member.specialty}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
       </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#005461] to-[#003844] text-white">
        <Container>
          <div className="container mx-auto ">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose StyleDecor?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCalendarCheck />,
                title: "Smart Scheduling",
                desc: "Book appointments online with real-time availability"
              },
              {
                icon: <FaClock />,
                title: "No Waiting Times",
                desc: "Eliminate walk-in crowds and endless waiting"
              },
              {
                icon: <FaHome />,
                title: "Dual Service Mode",
                desc: "Choose between in-studio consultations or on-site services"
              },
              {
                icon: <FaRocket />,
                title: "Real-Time Updates",
                desc: "Track your project status from assigned to completed"
              },
              {
                icon: <FaCheckCircle />,
                title: "Verified Decorators",
                desc: "All decorators are background-checked and certified"
              },
              {
                icon: <FaShieldAlt />,
                title: "Secure Payments",
                desc: "Safe and transparent payment processing"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl mb-4 text-[#FAB12F]">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        </Container>
      </section>

      {/* CTA Section */}
     <Container>
       <section className="py-16">
        <div className="container mx-auto ">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-[#005461] to-[#FAB12F] rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've transformed their spaces with StyleDecor
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#005461] font-bold px-8 py-4 rounded-full text-lg hover:shadow-2xl transition-all duration-300"
            >
              Book Your Consultation Now
            </motion.button>
          </motion.div>
        </div>
      </section>
     </Container>
    </div>
  );
};

export default About;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaBullseye, FaEye, FaRocket,
//   FaUsers, FaHandshake, FaAward,
//   FaCalendarCheck, FaHome, FaPaintBrush,
//   FaClock, FaStar, FaShieldAlt,
//   FaCheckCircle, FaHeart
// } from "react-icons/fa";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Loading from "../../Component/Loading/Loading";
// import Container from "../../Component/Container/Container";
// // import Container from "../../Component/Container/Container";
// // import Loading from "../../Component/Loading/Loading";

// // GSAP plugin
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const About = () => {
//   const [loading, setLoading] = useState(true);

//   /* fake loading for smooth UX */
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   /* GSAP animations */
//   useEffect(() => {
//     if (!loading) {
//       gsap.fromTo(
//         ".mission-card",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           stagger: 0.2,
//           scrollTrigger: {
//             trigger: ".mission-section",
//             start: "top 80%",
//           },
//         }
//       );

//       gsap.fromTo(
//         ".value-card",
//         { scale: 0.8, opacity: 0 },
//         {
//           scale: 1,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.15,
//           scrollTrigger: {
//             trigger: ".values-section",
//             start: "top 70%",
//           },
//         }
//       );
//     }
//   }, [loading]);

//   if (loading) return <Loading />;

//   /* ---------- DATA ---------- */
//   const teamMembers = [
//     { name: "Sarah Chen", role: "Creative Director", experience: "10+ years", specialty: "Wedding Decor", image: "https://randomuser.me/api/portraits/women/65.jpg" },
//     { name: "Marcus Johnson", role: "Lead Decorator", experience: "8 years", specialty: "Modern Interiors", image: "https://randomuser.me/api/portraits/men/32.jpg" },
//     { name: "Priya Sharma", role: "Event Specialist", experience: "6 years", specialty: "Ceremony Decor", image: "https://randomuser.me/api/portraits/women/44.jpg" },
//     { name: "David Wilson", role: "Operations Head", experience: "12 years", specialty: "Logistics", image: "https://randomuser.me/api/portraits/men/21.jpg" },
//   ];

//   const values = [
//     { icon: <FaStar />, title: "Excellence", desc: "Uncompromising quality in every project" },
//     { icon: <FaHeart />, title: "Passion", desc: "Love for transforming spaces" },
//     { icon: <FaHandshake />, title: "Integrity", desc: "Honest pricing & transparency" },
//     { icon: <FaUsers />, title: "Collaboration", desc: "Client-focused teamwork" },
//     { icon: <FaShieldAlt />, title: "Reliability", desc: "Trusted & dependable service" },
//   ];

//   const stats = [
//     { number: "500+", label: "Projects Completed" },
//     { number: "98%", label: "Client Satisfaction" },
//     { number: "50+", label: "Decorators" },
//     { number: "24/7", label: "Support" },
//   ];

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

//       {/* Hero */}
//       <section className="py-20 bg-gradient-to-r from-[#005461]/10 to-[#FAB12F]/10 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-4xl md:text-5xl font-bold mb-6"
//         >
//           <span className="text-[#005461]">Transforming </span>
//           <span className="text-[#FAB12F]">Spaces, </span>
//           <span className="text-[#005461]">Creating </span>
//           <span className="text-[#FAB12F]">Memories</span>
//         </motion.h1>

//         <p className="max-w-3xl mx-auto text-lg text-gray-600">
//           Professional decoration services that bring beauty, structure,
//           and emotion to every space.
//         </p>
//       </section>

//       {/* Stats */}
//       <section className="py-16 bg-white">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {stats.map((s, i) => (
//             <motion.div key={i} className="text-center">
//               <h3 className="text-4xl font-bold text-[#005461]">{s.number}</h3>
//               <p className="text-gray-600">{s.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 mission-section">
//         <Container>
//           <div className="grid md:grid-cols-2 gap-10">
//             <div className="mission-card bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#005461]">
//               <FaBullseye className="text-4xl text-[#005461] mb-4" />
//               <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
//               <p className="text-gray-600">
//                 Deliver seamless, tech-driven decoration services that
//                 eliminate waiting and elevate experiences.
//               </p>
//             </div>

//             <div className="mission-card bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#FAB12F]">
//               <FaEye className="text-4xl text-[#FAB12F] mb-4" />
//               <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
//               <p className="text-gray-600">
//                 To be the most trusted decoration platform, transforming
//                 spaces nationwide.
//               </p>
//             </div>
//           </div>
//         </Container>
//       </section>

//       {/* Values */}
//       <section className="py-20 values-section bg-gray-50">
//         <Container>
//           <h2 className="text-4xl font-bold text-center text-[#005461] mb-12">
//             Our Core Values
//           </h2>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             {values.map((v, i) => (
//               <div key={i} className="value-card bg-white p-6 rounded-xl shadow-lg text-center">
//                 <div className="text-3xl text-[#005461] mb-3">{v.icon}</div>
//                 <h3 className="font-bold text-lg">{v.title}</h3>
//                 <p className="text-sm text-gray-600">{v.desc}</p>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </section>

//       {/* Team */}
//       <section className="py-20 bg-white">
//         <Container>
//           <h2 className="text-4xl font-bold text-center text-[#005461] mb-12">
//             Meet Our Team
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((m, i) => (
//               <motion.div key={i} whileHover={{ y: -8 }} className="p-6 rounded-xl shadow-lg text-center">
//                 <img src={m.image} className="w-24 h-24 rounded-full mx-auto mb-4" />
//                 <h3 className="font-bold text-[#005461]">{m.name}</h3>
//                 <p className="text-[#FAB12F]">{m.role}</p>
//                 <p className="text-sm text-gray-500 mt-2">{m.specialty}</p>
//               </motion.div>
//             ))}
//           </div>
//         </Container>
//       </section>

//     </div>
//   );
// };

// export default About;
