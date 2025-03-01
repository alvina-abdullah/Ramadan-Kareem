"use client";
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      title: "Prayer Times",
      description: "Accurate prayer times based on your location with multiple calculation methods.",
      icon: "🕌"
    },
    {
      title: "Duas Collection",
      description: "Comprehensive collection of authentic duas for various occasions.",
      icon: "📿"
    },
    {
      title: "Ramadan Special",
      description: "Special features for Ramadan including sehri and iftar timings.",
      icon: "🌙"
    },
    {
      title: "Islamic Calendar",
      description: "Hijri calendar with important Islamic dates and events.",
      icon: "📅"
    }
  ];

  return (
    <div id='About' className="min-h-screen bg-gradient-to-b  from-emerald-800 to-[#134725]">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[40vh] flex items-center justify-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0  opacity-40"></div>
        <div className="z-10 text-center">
          <motion.h1 
            className="text-3xl md:text-6xl font-bold mb-4"
            {...fadeInUp}
          >
            About Our App
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Your Complete Islamic Companion
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We strive to provide Muslims around the world with accurate, reliable, and easy-to-access
            Islamic resources. Our goal is to help Muslims maintain their daily prayers, learn authentic
            duas, and stay connected with their faith in the modern digital age.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

    

        {/* Contact Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center text-white mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <a 
            href="mailto:contact@example.com"
            className="inline-block bg-white text-emerald-800 px-8 py-3 rounded-full font-semibold hover:bg-emerald-100 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
