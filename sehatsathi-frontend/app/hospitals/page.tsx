"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHospitals, seedHospitals } from "@/lib/api";

export default function HospitalsDirectory() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSeed = async () => {
    await seedHospitals();
    fetchAll();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Top Hospitals...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
         <div>
           <h1 className="text-3xl font-bold text-gray-900">Top Hospitals in India</h1>
           <p className="text-gray-500 mt-2">Find the best care facilities and their respective specialists.</p>
         </div>
         {hospitals.length === 0 && (
            <button onClick={handleSeed} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">
              Load Test Hospitals
            </button>
         )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((hosp: any) => (
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
