"use client";
import React from 'react';
import { useState } from 'react';

interface PrayerTime {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string; // Sehri time
  hijriDate: string;
  gregorianDate: string;
}

const Prayers: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?city=Dubai&country=United Arab Emirates&method=8`);
      const data = await response.json();
      
      setPrayerTimes({
        fajr: data.data.timings.Fajr,
        sunrise: data.data.timings.Sunrise,
        dhuhr: data.data.timings.Dhuhr,
        asr: data.data.timings.Asr,
        maghrib: data.data.timings.Maghrib,
        isha: data.data.timings.Isha,
        imsak: data.data.timings.Imsak,
        hijriDate: data.data.date.hijri.date,
        gregorianDate: data.data.date.gregorian.date
      });
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes();

    // Update date every minute
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    // Fetch new prayer times at midnight
    const midnightTimer = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        fetchPrayerTimes();
      }
    }, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(midnightTimer);
    };
  }, [date]);

  return (
    <div className="min-h-screen  bg-gradient-to-b  from-emerald-800 to-[#134725] p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-white text-center font-bold mb-8">
          رمضان المبارک Prayer Times page
        </h1>

        {loading ? (
          <div className="text-white text-center">Loading prayer times...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prayer Times Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Prayer Times</h2>
                {prayerTimes && (
                  <div className="space-y-3">
                    <PrayerRow 
                      title="Imsak (Sehri)" 
                      time={prayerTimes.imsak}
                      isNext={isNextPrayer('imsak', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Fajr" 
                      time={prayerTimes.fajr}
                      isNext={isNextPrayer('fajr', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Sunrise" 
                      time={prayerTimes.sunrise}
                      isNext={isNextPrayer('sunrise', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Dhuhr" 
                      time={prayerTimes.dhuhr}
                      isNext={isNextPrayer('dhuhr', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Asr" 
                      time={prayerTimes.asr}
                      isNext={isNextPrayer('asr', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Maghrib (Iftar)" 
                      time={prayerTimes.maghrib}
                      isNext={isNextPrayer('maghrib', prayerTimes)}
                    />
                    <PrayerRow 
                      title="Isha" 
                      time={prayerTimes.isha}
                      isNext={isNextPrayer('isha', prayerTimes)}
                    />
                  </div>
                )}
              </div>

              {/* Ramadan Special */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Ramadan Special</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-800">Islamic Date</h3>
                    <p className="text-gray-600">{prayerTimes?.hijriDate}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-800">Taraweeh</h3>
                    <p className="text-gray-600">After Isha Prayer</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-800">Dua for Breaking Fast</h3>
                    <p className="text-gray-600 text-right mt-2">
                      اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Display */}
            <div className="mt-6 text-center text-white">
              <p className="text-lg">
                {date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const isNextPrayer = (prayerName: string, prayerTimes: PrayerTime): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayerTime = prayerTimes[prayerName as keyof PrayerTime];
  if (!prayerTime) return false;
  
  const [hours, minutes] = prayerTime.split(':').map(Number);
  const prayerTimeInMinutes = hours * 60 + minutes;
  
  // Get all prayer times in minutes
  const allPrayerTimes = [
    { name: 'imsak', time: getTimeInMinutes(prayerTimes.imsak) },
    { name: 'fajr', time: getTimeInMinutes(prayerTimes.fajr) },
    { name: 'sunrise', time: getTimeInMinutes(prayerTimes.sunrise) },
    { name: 'dhuhr', time: getTimeInMinutes(prayerTimes.dhuhr) },
    { name: 'asr', time: getTimeInMinutes(prayerTimes.asr) },
    { name: 'maghrib', time: getTimeInMinutes(prayerTimes.maghrib) },
    { name: 'isha', time: getTimeInMinutes(prayerTimes.isha) }
  ];

  // Sort and find next prayer
  const nextPrayer = allPrayerTimes
    .sort((a, b) => a.time - b.time)
    .find(prayer => prayer.time > currentTime);

  return nextPrayer?.name === prayerName;
};

const getTimeInMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const PrayerRow: React.FC<{ 
  title: string; 
  time: string;
  isNext?: boolean;
}> = ({ title, time, isNext }) => (
  <div className={`flex justify-between items-center border-b border-gray-200 py-2 
    ${isNext ? 'bg-emerald-100 rounded p-2' : ''}`}>
    <span className="text-gray-700">{title}</span>
    <span className={`font-semibold ${isNext ? 'text-emerald-800' : 'text-emerald-600'}`}>
      {time}
    </span>
  </div>
);

export default Prayers;
