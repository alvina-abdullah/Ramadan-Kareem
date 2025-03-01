"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Dua {
  id: number;
  title: string;
  arabic: string;
  translation: string;
  transliteration: string;
  reference: string;
  category: string;
}

const categories = [
  "Morning & Evening",
  "Daily Life",
  "Ramadan",
  "Prayer",
  "Food & Drink",
  "Travel",
  "Protection",
  "Forgiveness",
] as const;

const Duas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dua Data (No need for useState since it's static)
  const duas: Dua[] = [
    {
      id: 1,
      category: "Ramadan",
      title: "Dua for Breaking Fast",
      arabic:
        "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      translation:
        "O Allah! I fasted for You and I believe in You and I break my fast with Your sustenance",
      transliteration:
        "Allahumma inni laka sumtu wa bika aamantu wa ala rizqika aftartu",
      reference: "Abu Dawud",
    },
    {
      id: 2,
      category: "Morning & Evening",
      title: "Morning Remembrance",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
      translation:
        "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah",
      transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah",
      reference: "Muslim",
    },
  ];

  const filteredDuas = duas.filter((dua) => {
    const matchesCategory =
      selectedCategory === "All" || dua.category === selectedCategory;
    const matchesSearch =
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="Duas" className="min-h-screen bg-gradient-to-b from-emerald-800 to-[#134725]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl py-7 text-white text-center font-bold mb-8">
          Daily Duas
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search duas..."
            className="w-full p-3 rounded-lg shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "All"
                  ? "bg-white text-[#FFD700]"
                  : "bg-white text-[#FFD700]"
              } hover:bg-white hover:text-[#004D4D] transition-colors`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-white text-[#FFD700]"
                    : "bg-white text-[#FFD700]"
                } hover:bg-white hover:text-[#004D4D] transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Duas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDuas.map((dua) => (
              <motion.div
                key={dua.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[#FFD700]">
                      {dua.title}
                    </h3>
                    <span className="text-sm bg-[#FFD700] text-[#004D4D] px-2 py-1 rounded">
                      {dua.category}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-right text-2xl leading-loose text-gray-800">
                      {dua.arabic}
                    </p>
                    <p className="text-gray-600 italic">{dua.transliteration}</p>
                    <p className="text-gray-800">{dua.translation}</p>
                    <p className="text-sm text-gray-500">
                      Reference: {dua.reference}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center text-white text-xl mt-8">
            No duas found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Duas;
