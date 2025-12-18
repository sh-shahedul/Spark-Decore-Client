import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number with Animation */}
          <motion.div 
            className="relative mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 leading-none">
              404
            </h1>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-0 left-1/4 text-6xl"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔍
            </motion.div>
            
            <motion.div
              className="absolute top-10 right-1/4 text-5xl"
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              ❓
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best explorers get lost sometimes!
            </p>
          </motion.div>

          {/* Suggestions Box */}
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Here's what you can do:
            </h3>
            <ul className="space-y-3 text-left text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <span className="flex-1">Go back to the homepage and start fresh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔙</span>
                <span className="flex-1">Use your browser's back button</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔗</span>
                <span className="flex-1">Check if the URL is typed correctly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <span className="flex-1">Contact support if you believe this is an error</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/">
              <motion.button 
                className="btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none px-8 py-3 text-lg font-semibold rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Go to Homepage
              </motion.button>
            </Link>
            
            <motion.button 
              onClick={() => window.history.back()}
              className="btn btn-outline border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Go Back
            </motion.button>
          </motion.div>

          {/* Fun Animation at Bottom */}
          <motion.div 
            className="mt-12 text-6xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎯
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageNotFound;