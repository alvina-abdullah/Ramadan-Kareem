"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [duas, setDuas] = useState<Dua[]>([
    {
      id: 1,
      category: "Ramadan",
      title: "Dua for Breaking Fast",
      arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      translation: "O Allah! I fasted for You and I believe in You and I break my fast with Your sustenance",
      transliteration: "Allahumma inni laka sumtu wa bika aamantu wa ala rizqika aftartu",
      reference: "Abu Dawud"
    },
    {
      id: 2,
      category: "Morning & Evening",
      title: "Morning Remembrance",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
      translation: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah",
      transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah",
      reference: "Muslim"
    },
    {
      id: 3,
      category: "Protection",
      title: "Dua for Protection from Evil",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      translation: "I seek refuge in the perfect words of Allah from the evil of what He has created",
      transliteration: "A'udhu bi kalimati-llahit-tammati min sharri ma khalaq",
      reference: "Muslim"
    },
    {
      id: 4,
      category: "Daily Life",
      title: "Dua Before Sleeping",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      translation: "In Your name, O Allah, I die and I live",
      transliteration: "Bismika Allahumma amootu wa ahya",
      reference: "Bukhari"
    },
    {
      id: 5,
      category: "Food & Drink",
      title: "Dua Before Eating",
      arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ الله",
      translation: "In the name of Allah and with the blessings of Allah",
      transliteration: "Bismillahi wa 'ala barakatillah",
      reference: "Abu Dawud"
    },
    {
      id: 6,
      category: "Travel",
      title: "Dua for Traveling",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
      translation: "Glory to Him Who has subjected this to us, for we could never have accomplished this",
      transliteration: "Subhanal-lathee sakhara lana haatha wa ma kunna lahu muqrineen",
      reference: "Muslim"
    },
    {
      id: 7,
      category: "Prayer",
      title: "Dua After Prayer",
      arabic: "اللَّهُمَّ أَنْتَ السَّلاَمُ، وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
      translation: "O Allah, You are Peace, and peace comes from You. Blessed are You, O Lord of Glory and Honor",
      transliteration: "Allahumma antas-salam wa minkas-salam, tabarakta ya thal-jalali wal-ikram",
      reference: "Muslim"
    },
    {
      id: 8,
      category: "Forgiveness",
      title: "Dua for Forgiveness",
      arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
      translation: "My Lord, forgive me and accept my repentance, for You are the Ever-Accepting of repentance, the Most Merciful",
      transliteration: "Rabbigh-fir lee wa tub 'alayya innaka antat-tawwabur-raheem",
      reference: "Tirmidhi"
    },
    {
      id: 9,
      category: "Morning & Evening",
      title: "Evening Remembrance",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
      translation: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah",
      transliteration: "Amsayna wa amsal mulku lillahi wal hamdu lillah",
      reference: "Muslim"
    },
    {
      id: 10,
      category: "Protection",
      title: "Dua for Anxiety",
      arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
      translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers",
      transliteration: "La ilaha illa anta subhanaka inni kuntu minaz-zalimin",
      reference: "Tirmidhi"
    },
    {
      id: 11,
      category: "Ramadan",
      title: "Dua for Laylatul Qadr",
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      translation: "O Allah, You are forgiving and love forgiveness, so forgive me",
      transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
      reference: "Ibn Majah"
    },
    {
      id: 12,
      category: "Daily Life",
      title: "Dua When Entering Home",
      arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا",
      translation: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely",
      transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala rabbina tawakkalna",
      reference: "Abu Dawud"
    },
    {
      id: 13,
      category: "Food & Drink",
      title: "Dua After Eating",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      translation: "Praise be to Allah who has fed me this and provided it for me without any might or power on my part",
      transliteration: "Alhamdu lillahil-lathi at'amani hatha wa razaqanihi min ghayri hawlin minni wa la quwwah",
      reference: "Abu Dawud"
    },
    {
      id: 14,
      category: "Prayer",
      title: "Dua Before Wudu",
      arabic: "بِسْمِ ٱللَّٰهِ",
      translation: "In the name of Allah",
      transliteration: "Bismillah",
      reference: "Abu Dawud"
    },
    {
      id: 15,
      category: "Protection",
      title: "Dua Before Sleeping",
      arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِن أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
      translation: "In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul, then have mercy upon it, and if You should return my soul, then protect it in the manner You do so with Your righteous servants",
      transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uhu, fa in amsakta nafsi farhamha, wa in arsaltaha fahfadh-ha bima tahfadhu bihi 'ibadakas-salihin",
      reference: "Bukhari"
    },
    {
      id: 16,
      category: "Forgiveness",
      title: "Sayyid-ul-Istighfar",
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      translation: "O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I am faithful to my covenant and promise to You as much as I can",
      transliteration: "Allahumma anta Rabbi la ilaha illa ant, khalaqtani wa ana abduk, wa ana 'ala 'ahdika wa wa'dika mas-tata't",
      reference: "Bukhari"
    },
    {
      id: 17,
      category: "Daily Life",
      title: "Dua When Leaving Home",
      arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
      translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah",
      transliteration: "Bismillah, tawakkaltu 'ala Allah, wa la hawla wa la quwwata illa billah",
      reference: "Abu Dawud"
    }
  ]);

  const filteredDuas = duas.filter(dua => {
    const matchesCategory = selectedCategory === "All" || dua.category === selectedCategory;
    const matchesSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id='Duas' className="min-h-screen  bg-gradient-to-b   from-emerald-800 to-[#134725]">
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
                    <p className="text-gray-600 italic">
                      {dua.transliteration}
                    </p>
                    <p className="text-gray-800">
                      {dua.translation}
                    </p>
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
