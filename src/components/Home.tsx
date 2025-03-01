"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Simple icon components



export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#134725]">
        <div className="absolute inset-0">
          <Image
            src="/image.png"
            alt="Islamic Pattern"
            fill
            className="opacity-15 object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-arabic">
                رمضان كريم
                <span className="block text-3xl md:text-4xl text-[#FFD700] mt-4 font-english">
                  Ramadan Kareem
                </span>
                <span className="block text-xl md:text-2xl text-[#E6B800] mt-2 font-english">
                  Welcome to Your Sacred Journey
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                Enhance your spiritual connection this Ramadan with accurate prayer times, 
                beautiful duas, and daily Islamic reminders
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex gap-4"
              >
                <Link
                  href="/prayers"
                  className="bg-[#FFD700] text-[#004D4D] px-8 py-3 rounded-md font-semibold hover:bg-[#E6B800] transition-colors"
                >
                  Prayer Times
                </Link>
                <Link
                  href="/duas"
                  className="border-2 border-[#FFD700] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#FFD700] hover:text-[#004D4D] transition-colors"
                >
                  Daily Duas
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <Image
                src="/home.png"
                alt="home.png"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
