"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHospitals, seedHospitals } from "@/lib/api";

export default function HospitalsDirectory() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isListening, setIsListening] = useState(false);

  async function fetchAll() {
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // Debounce effect logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const startVoiceSearch = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Voice Search. Please use Chrome/Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const speech = event.results[0][0].transcript;
      setSearchQuery(speech);
      setDebouncedSearch(speech);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSeed = async () => {
    await seedHospitals();
    fetchAll();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Hospitals...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
         <div>
           <h1 className="text-3xl font-bold text-gray-900">Hospitals in India</h1>
           <p className="text-gray-500 mt-2">Find the best care facilities and their respective specialists.</p>
         </div>
         {hospitals.length === 0 && (
            <button onClick={handleSeed} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Load Test Hospitals
            </button>
         )}
      </div>

      {/* Modern Search Bar */}
      <div className="mb-8 flex gap-3">
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Search by Hospital Name or City... (Type or speak)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') setDebouncedSearch(searchQuery); }}
            className="w-full border border-gray-300 p-4 pr-16 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-lg"
          />
          <button 
            type="button"
            title="Voice Search"
            onClick={startVoiceSearch}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full transition-colors flex items-center justify-center ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            🎤
          </button>
        </div>
        <button 
          onClick={() => setDebouncedSearch(searchQuery)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-sm transition"
        >
          Search
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hospitals
          .filter((hosp: any) => 
            hosp.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
            hosp.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((hosp: any) => (
          <div key={hosp._id} className="border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-lg overflow-hidden flex flex-col transition h-full text-gray-800">
             {/* Hospital Image */}
             <div 
               className="h-48 w-full bg-cover bg-center" 
               style={{ backgroundImage: `url(${hosp.image || 'https://via.placeholder.com/800'})` }} 
             />
             
             <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                   <h2 className="text-2xl font-bold text-blue-900">{hosp.name}</h2>
                   <p className="text-gray-500 font-medium mb-3 flex items-center gap-1">📍 {hosp.location}</p>
                   <span className="bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full text-sm inline-block mb-4">
                      ⭐ {hosp.rating} Rating
                   </span>
                   <p className="text-sm text-gray-600 line-clamp-3 mb-6">{hosp.description}</p>
                </div>
                
                <Link 
                  href={`/hospitals/${hosp._id}`}
                  className="mt-auto block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
                >
                  View Details & Doctors
                </Link>
             </div>
          </div>
        ))}
      </div>
      
      {hospitals.length === 0 && (
         <div className="text-center py-20 text-gray-400">
            No Hospitals active. Click 'Load Test Hospitals' above!
         </div>
      )}
    </div>
  );
}
