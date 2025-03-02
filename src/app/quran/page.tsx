"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  translation: string;
}

const Quran: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      fetchAyahs(selectedSurah);
    }
  }, [selectedSurah]);

  // Fetch all Surahs
  const fetchSurahs = async () => {
    try {
      const response = await fetch("http://api.alquran.cloud/v1/surah");
      const data = await response.json();
      setSurahs(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching surahs:", error);
      setLoading(false);
    }
  };

  // Fetch Ayahs for selected Surah
  const fetchAyahs = async (surahNumber: number) => {
    try {
      const [arabicResponse, translationResponse] = await Promise.all([
        fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`),
      ]);

      const arabicData = await arabicResponse.json();
      const translationData = await translationResponse.json();

      console.log("Arabic Data:", arabicData);
      console.log("Translation Data:", translationData);

      if (!arabicData.data || !translationData.data) {
        console.error("Invalid API response");
        return;
      }

      const combinedAyahs = arabicData.data.ayahs.map(
        (ayah: { numberInSurah: number; text: string }, index: number) => ({
          number: ayah.numberInSurah,
          text: ayah.text,
          translation: translationData.data.ayahs?.[index]?.text || "Translation not found",
        })
      );

      console.log("Combined Ayahs:", combinedAyahs);
      setAyahs(combinedAyahs);
    } catch (error) {
      console.error("Error fetching ayahs:", error);
    }
  };

  // Filter Surahs based on search query
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="Quran" className="min-h-screen bg-gradient-to-br from-emerald-800 to-[#134725] p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl text-white text-center font-bold mb-8 drop-shadow-lg"
        >
          Al-Quran Al-Kareem
        </motion.h1>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search Surah..."
            className="w-full p-4 rounded-lg bg-emerald-950/40 text-white placeholder-emerald-300/50 border border-emerald-700/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-lg backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Surah List or Ayah Details */}
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-emerald-100 text-xl">
            Loading...
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedSurah === null ? (
              <AnimatePresence mode="popLayout">
                {filteredSurahs.map((surah, index) => (
                  <motion.div
                    key={surah.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    onClick={() => setSelectedSurah(surah.number)}
                    className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-emerald-900/50 transition-all border border-emerald-700/50 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-400/10 hover:scale-[1.02] group"
                  >
                    <h3 className="text-xl font-semibold text-white">{surah.englishName}</h3>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedSurah(null)}
                  className="mb-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all shadow-lg"
                >
                  ← Back to Surah List
                </motion.button>

                {/* Ayah List */}
                <div className="space-y-6">
                  {ayahs.length === 0 && <p className="text-white">No Ayahs found!</p>}
                  {ayahs.map((ayah, index) => (
                    <motion.div
                      key={ayah.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-8 border border-emerald-700/50 shadow-lg"
                    >
                      <p className="text-right text-3xl text-white">{ayah.text}</p>
                      <div className="h-px bg-emerald-700/50 my-6"></div>
                      <p className="text-emerald-100">{ayah.translation}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quran;
