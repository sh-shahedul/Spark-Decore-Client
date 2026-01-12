import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Sparkles, Flower, Palette, Zap, ArrowRight } from 'lucide-react';

const MehediNightEvent = () => {
  // 1. Countdown Logic (Fixed 10 Days from now)
  const eventDate = useMemo(() => {
    const target = new Date();
    target.setDate(target.getDate() + 10);
    target.setHours(19, 0, 0, 0); 
    return target.getTime();
  }, []);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    setTimeLeft(calculateTime()); 

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto  py-16 px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-[#005461]/10 text-[#005461] dark:text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4 border border-[#005461]/20">
                Upcoming Celebration
              </span>
              <h1 className="text-5xl sm:text-7xl font-serif font-bold text-[#005461] dark:text-white leading-[1.1]">
                Vibrant <br />
                <span className="text-[#FAB12F]">Mehedi Night</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-gray-400 max-w-lg leading-relaxed">
                Experience a blend of traditional artistry and modern elegance. From bespoke henna patterns to breathtaking floral installations, we are curating a night of magic and memories.
              </p>
            </div>

            {/* Countdown Timer Row */}
            <div className="flex gap-4 sm:gap-8 bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-xl shadow-[#005461]/5 border border-slate-100 dark:border-slate-700 w-fit">
              {[
                { v: timeLeft.days, l: 'Days' },
                { v: timeLeft.hours, l: 'Hours' },
                { v: timeLeft.minutes, l: 'Mins' },
                { v: timeLeft.seconds, l: 'Secs' }
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center min-w-[50px]">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={t.v}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-4xl font-serif font-bold text-[#005461] dark:text-[#FAB12F]"
                    >
                      {t.v.toString().padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">{t.l}</span>
                </div>
              ))}
            </div>

            {/* Event Details Card */}
            <div className="space-y-4 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-[#005461]/5 border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FAB12F]/10 rounded-bl-full group-hover:scale-110 transition-transform" />
                
                <div className="flex items-center gap-4 text-[#005461] dark:text-gray-200">
                  <Calendar className="text-[#FAB12F]" />
                  <span className="font-bold uppercase tracking-tight">
                    {new Date(eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-slate-600 dark:text-gray-300">
                  <MapPin className="text-[#FAB12F]" />
                  <span>Spark Decore Center, Purbachal, Dhaka</span>
                </div>

                <button className="w-full mt-4 py-4 bg-[#005461] hover:bg-[#003d47] text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg">
                  Reserve Your Invitation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
          </motion.div>

          {/* Right Side: Artistic Gallery Layout */}
          <div className="lg:col-span-7 relative h-[600px] sm:h-[800px] mt-12 lg:mt-0 -ml-9 lg:ml-0">
            
            {/* 1. Main Focus Image (Mehedi Stage) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              className="absolute top-10 left-[10%] w-[65%] h-[70%] z-20 shadow-2xl rounded-[3rem] overflow-hidden border-[14px] border-white dark:border-slate-800"
            >
              <img 
               src="https://i.pinimg.com/736x/d4/32/c5/d432c513e1993aa7070492c72587bab3.jpg" 
                className="w-full h-full object-cover" 
                alt="Mehedi Decor" 
              />
            </motion.div>

            {/* 2. Top Right Detail (Henna/Traditional) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-0 right-5 w-[40%] h-[32%] z-30 shadow-2xl rounded-2xl overflow-hidden border-8 border-white dark:border-slate-800 rotate-[4deg]"
            >
              <img 
                src="https://i.pinimg.com/736x/f0/aa/fe/f0aafe859d8a0c098a52317766ebf957.jpg" 
                className="w-full h-full object-cover" 
                alt="Mehedi Hands" 
              />
            </motion.div>

            {/* 3. Bottom Right Detail (Marigold/Flowers) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 right-0 w-[45%] h-[42%] z-40 shadow-2xl rounded-[2.5rem] overflow-hidden border-[10px] border-white dark:border-slate-800 rotate-[-4deg]"
            >
              <img 
                src="https://i.pinimg.com/1200x/84/01/ec/8401ecf4822d2775c9ae244dfb74498d.jpg" 
                className="w-full h-full object-cover" 
                alt="Mehedi Floral Setup" 
              />
            </motion.div>

            {/* Rotating Badge */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute md:top-1/2 top-65 md:right-[-20px] right-16 w-22 md:w-32 h-22 md:h-32 z-50 flex items-center justify-center rounded-full bg-[#FAB12F] text-[#005461] font-bold text-center text-[10px] shadow-2xl border-4 border-dashed border-[#005461]/30"
            >
              PREMIUM <br /> MEHEDI <br /> DECOR
            </motion.div>

            {/* Background Accent Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#005461]/5 rounded-full -z-10 blur-3xl" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default MehediNightEvent;