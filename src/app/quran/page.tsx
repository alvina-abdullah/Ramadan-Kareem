"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const fetchSurahs = async () => {
    try {
      const response = await fetch('http://api.alquran.cloud/v1/surah');
      const data = await response.json();
      setSurahs(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surahs:', error);
      setLoading(false);
    }
  };

  const fetchAyahs = async (surahNumber: number) => {
    try {
      const [arabicResponse, translationResponse] = await Promise.all([
        fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`),
        fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`)
      ]);

      const arabicData = await arabicResponse.json();
      const translationData = await translationResponse.json();

   const combinedAyahs = arabicData.data.ayahs.map((ayah: { numberInSurah: number; text: string }, index: number) => ({

        number: ayah.numberInSurah,
        text: ayah.text,
        translation: translationData.data.ayahs[index].text
      }));

      setAyahs(combinedAyahs);
    } catch (error) {
      console.error('Error fetching ayahs:', error);
    }
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id='Quran' className="min-h-screen bg-gradient-to-br  from-emerald-800 to-[#134725] p-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl text-white text-center font-bold mb-8 drop-shadow-lg"
        >
          Al-Quran Al-Kareem
        </motion.h1>

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

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-emerald-100 text-xl"
          >
            Loading...
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedSurah === null ? (
              // Surah List View
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
                      ease: "easeOut"
                    }}
                    onClick={() => setSelectedSurah(surah.number)}
                    className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-emerald-900/50 transition-all border border-emerald-700/50 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-400/10 hover:scale-[1.02] group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-emerald-400 font-bold text-lg group-hover:text-emerald-300">
                        {surah.number}
                      </span>
                      <span className="text-emerald-100 text-sm px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50">
                        {surah.revelationType}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-200">
                      {surah.englishName}
                    </h3>
                    <p className="text-emerald-200/80">{surah.englishNameTranslation}</p>
                    <p className="text-emerald-300/60 text-sm mt-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {surah.numberOfAyahs} Verses
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              // Ayah View
              <div className="col-span-full">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedSurah(null)}
                  className="mb-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-400/25 flex items-center gap-2 group"
                >
                  <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                  Back to Surah List
                </motion.button>
                <div className="space-y-6">
                  {ayahs.map((ayah, index) => (
                    <motion.div
                      key={ayah.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      className="bg-emerald-950/40 backdrop-blur-sm rounded-xl p-8 border border-emerald-700/50 shadow-lg hover:shadow-emerald-400/10 transition-all group"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="text-emerald-400 font-bold px-4 py-2 rounded-full bg-emerald-900/60 border border-emerald-700/50"
                        >
                          Verse {ayah.number}
                        </motion.span>
                      </div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-right text-3xl leading-loose text-white mb-6 font-arabic group-hover:text-emerald-100"
                      >
                        {ayah.text}
                      </motion.p>
                      <div className="h-px bg-gradient-to-r from-transparent via-emerald-700/50 to-transparent my-6"></div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-emerald-100/90 leading-relaxed"
                      >
                        {ayah.translation}
                      </motion.p>
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
