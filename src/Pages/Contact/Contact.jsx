import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaPaperPlane, FaWhatsapp, FaInstagram, 
  FaFacebook, FaTwitter, FaCheckCircle,
  FaUser, FaBuilding
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Container from '../../Component/Container/Container';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(true);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const businessInfo = {
    phone: '+1 (212) 555-1234',
    phoneAlt: '+1 (212) 555-5678',
    email: 'contact@styledecor.com',
    emailSupport: 'support@styledecor.com',
    address: '123 Design District, Manhattan, NY 10001',
    hours: { weekdays: '9:00 AM - 7:00 PM', saturday: '10:00 AM - 5:00 PM', sunday: 'By Appointment Only' }
  };

  const serviceOptions = [
    "Wedding & Ceremony Decoration",
    "Home Interior Design",
    "Office & Commercial Space",
    "Event & Party Decor",
    "Consultation & Planning",
    "Custom Design Package"
  ];

  const socialMedia = [
    { platform: "Instagram", icon: <FaInstagram />, handle: "@styledecor.nyc", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { platform: "Facebook", icon: <FaFacebook />, handle: "@styledecornyc", color: "bg-blue-600" },
    { platform: "Twitter", icon: <FaTwitter />, handle: "@styledecor_ny", color: "bg-sky-500" },
    { platform: "WhatsApp", icon: <FaWhatsapp />, handle: "+1 (212) 555-1234", color: "bg-green-500" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      setIsOpen(hour >= 9 && hour < 19);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading('Sending inquiry...');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      toast.success('Inquiry sent! We will contact you within 24 hours.');

      const existing = JSON.parse(localStorage.getItem('styledecor_inquiries') || '[]');
      localStorage.setItem('styledecor_inquiries', JSON.stringify([...existing, { ...data, timestamp: new Date().toISOString() }]));

      setFormSubmitted(true);
      reset();
      setTimeout(() => setFormSubmitted(false), 8000);

    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to send. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    { icon: <FaPhone />, title: "Call Us", details: [businessInfo.phone, businessInfo.phoneAlt], action: () => { navigator.clipboard.writeText(businessInfo.phone); toast.success('Phone copied!'); }, badge: isOpen ? "Live Now" : "Leave Message", badgeColor: isOpen ? "bg-green-500" : "bg-yellow-500" },
    { icon: <FaEnvelope />, title: "Email Us", details: [businessInfo.email, businessInfo.emailSupport], action: () => { window.location.href = `mailto:${businessInfo.email}`; toast('Opening email client...'); } },
    { icon: <FaMapMarkerAlt />, title: "Visit Studio", details: [businessInfo.address], action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(businessInfo.address)}`, '_blank') },
    { icon: <FaClock />, title: "Business Hours", details: [`Mon-Fri: ${businessInfo.hours.weekdays}`, `Sat: ${businessInfo.hours.saturday}`, `Sun: ${businessInfo.hours.sunday}`], action: () => toast(`Current time: ${currentTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`) }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     <title>spark decore | Contact</title>

      {/* Hero */}
      <div className="relative bg-gradient-to-r from-[#005461] to-[#003844] text-white overflow-hidden py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-4xl md:text-5xl font-bold mb-4 mt-10">Contact <span className="text-[#FAB12F]">StyleDecor</span></motion.h1>
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-xl opacity-90 mb-8">Ready to transform your space? Our design team is here to bring your vision to life.</motion.p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="font-medium">{isOpen ? 'Live Support Available' : 'Outside Business Hours'}</span>
            <span className="text-sm opacity-75">• {currentTime.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} EST</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })} className="bg-[#FAB12F] text-[#005461] font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:shadow-lg"><FaPaperPlane /> Get Free Quote</motion.button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={() => window.open('https://wa.me/12125551234', '_blank')} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/30"><FaWhatsapp /> WhatsApp Chat</motion.button>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
     <Container>
         <div className="container mx-auto px-4 py-12 -mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((m, i) => (
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} onClick={m.action} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#005461]/10 text-[#005461]">{m.icon}</div>
              {m.badge && <span className={`${m.badgeColor} text-white text-xs px-3 py-1 rounded-full`}>{m.badge}</span>}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{m.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{m.details[0]}</p>
            {m.details.slice(1).map((d, idx) => <p key={idx} className="text-gray-800 font-medium">{d}</p>)}
          </motion.div>
        ))}
      </div>
     </Container>

      {/* Contact Form */}
      <Container>
        <div className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {formSubmitted ? (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center py-12">
              <FaCheckCircle className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-600 mb-6">We've received your inquiry. Our team will contact you within 24 hours.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-[#005461] font-semibold hover:underline">Submit Another Inquiry</button>
            </motion.div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><FaUser className="inline mr-2" /> Full Name *</label>
                  <input {...register("name",{required:true})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#005461]/30 focus:border-[#005461]" placeholder="John Smith" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><FaEnvelope className="inline mr-2" /> Email *</label>
                  <input type="email" {...register("email",{required:true})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#005461]/30 focus:border-[#005461]" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><FaPhone className="inline mr-2" /> Phone</label>
                  <input type="tel" {...register("phone")} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#005461]/30 focus:border-[#005461]" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><FaBuilding className="inline mr-2" /> Service *</label>
                  <select {...register("service",{required:true})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#005461]/30 focus:border-[#005461] bg-white">
                    <option value="">Select a service</option>
                    {serviceOptions.map((s,i)=><option key={i} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
                <textarea rows="5" {...register("message",{required:true,minLength:20})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#005461]/30 focus:border-[#005461]" placeholder="Tell us about your project..." />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" {...register("consent",{required:true})} className="mt-1"/>
                <label className="text-sm text-gray-600">I agree to receive quotes and proposals from StyleDecor.</label>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#005461] to-[#003844] text-white font-bold py-4 rounded-lg hover:shadow-xl disabled:opacity-50">{loading ? 'Processing...' : 'Submit Inquiry'}</button>
            </form>
          )}
        </div>

       {/* Right Side - Map + Social */}
<div className="space-y-8">
  {/* Map */}
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <h3 className="text-xl font-bold p-6">Visit Our Studio - Uttara</h3>
    <div className="w-full h-80">
      <iframe
        title="Uttara Studio Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.897383897221!2d90.39815721543197!3d23.873267394965366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b1594f09d1%3A0x3e89c3e4c7c7a8d2!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="p-6 text-center">
      <button
        onClick={() => window.open('https://www.google.com/maps/place/Uttara,+Dhaka', '_blank')}
        className="bg-[#FAB12F] text-[#005461] font-bold px-6 py-3 rounded-full hover:shadow-lg"
      >
        Open in Google Maps
      </button>
    </div>
  </div>

 
</div>

      </div>
      </Container>
    </div>
  );
};

export default Contact;
