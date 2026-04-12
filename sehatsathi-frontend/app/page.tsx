"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDoctors } from "@/lib/api";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const router = useRouter();

  // Fetch doctors on load
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  // Debounce effect logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Simple Logout Helper
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    router.refresh();
  };

  if (loading) return <div className="p-6">Loading doctors...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Available Doctors</h1>
        <button onClick={handleLogout} className="text-sm border px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">Logout</button>
      </div>

      {/* Modern Search Bar */}
      <div className="mb-8 flex gap-3">
        <input 
          type="text"
          placeholder="Search by Doctor Name, Specialization or Hospital..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') setDebouncedSearch(searchQuery); }}
          className="flex-1 border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-lg"
        />
        <button 
          onClick={() => setDebouncedSearch(searchQuery)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-sm transition"
        >
          Search
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors
          .filter((doc: any) => 
            doc.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
            doc.specialization?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            doc.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((doc: any) => (
          <div key={doc._id} className="border border-gray-200 p-6 rounded-2xl shadow-sm bg-white hover:shadow-lg transition flex flex-col justify-between h-full">
            <div>
              {/* Profile Image Banner */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                {doc.photoUrl ? (
                   <img src={doc.photoUrl} alt={doc.name} className="w-16 h-16 rounded-full object-cover border" />
                ) : (
                   <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-2xl border">👨‍⚕️</div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-blue-900">{doc.name}</h2>
                  <p className="text-gray-600 font-medium">{doc.specialization}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-700 mb-6">
                 <span className="font-semibold bg-gray-100 px-3 py-1 rounded-full">⭐ {doc.rating || 'N/A'} Rating</span>
                 {doc.consultationModes && (
                    <span className="bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full">
                       {doc.consultationModes.includes('online') ? 'Online Avail' : 'In-Person'}
                    </span>
                 )}
              </div>
            </div>
            
            {/* View Profile Action */}
            <Link 
              href={`/doctor/${doc._id}`}
              target="_blank"
              className="mt-auto block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
            >
              View Profile & Book
            </Link>
          </div>
        ))}
        {/* Empty State */}
        {doctors.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
               No doctors available right now. Please check back later!
            </div>
        )}
      </div>
      
    </div>
  );
}
