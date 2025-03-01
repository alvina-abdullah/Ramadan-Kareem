"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Simple icon components
const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const features = [
  {
    title: "Prayer Times",
    description: "Accurate prayer times and Sehri/Iftar schedule for your location",
    icon: <CalendarIcon />,
  },
  {
    title: "Daily Duas",
    description: "Collection of essential duas for Ramadan with translations",
    icon: <BookIcon />,
  },
  {
    title: "Spiritual Guidance",
    description: "Daily reminders and Islamic teachings for Ramadan",
    icon: <StarIcon />,
  },
];

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
