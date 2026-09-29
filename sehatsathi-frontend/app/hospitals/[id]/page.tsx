"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getHospitalById } from "@/lib/api";
export default function HospitalProfile() {
  const { id } = useParams() as { id: string };
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadHospital() {
      try { setHospital(await getHospitalById(id)); }
      catch (error) { console.error("Failed to load hospital:", error); }
      finally { setLoading(false); }
    }
    if (id) loadHospital();
  }, [id]);
  if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  if (!hospital) return <div className="p-8 text-center text-red-500">Hospital not found!</div>;
  return <div>
    <div className="relative h-80 w-full bg-cover bg-center" style={{ backgroundImage: `url(${hospital.image || "https://via.placeholder.com/1200"})` }}>
      <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-12"><div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-2 text-5xl font-extrabold text-white">{hospital.name}</h1><p className="text-2xl text-gray-200">📍 {hospital.location}</p>
        <div className="mt-4 inline-block rounded-full bg-yellow-400 px-4 py-2 font-bold text-yellow-900 shadow-lg">⭐ {hospital.rating} Rated Facility</div>
      </div></div>
    </div>
    <div className="mx-auto mt-8 max-w-6xl p-6">
      <h2 className="mb-4 border-b pb-4 text-2xl font-bold text-gray-900">About Facility</h2>
      <p className="max-w-3xl text-lg leading-relaxed text-gray-700">{hospital.description}</p>
      <div className="mt-8 max-w-3xl rounded-xl border border-blue-100 bg-blue-50 p-6"><h3 className="mb-2 font-bold text-blue-900">Patient Services</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm font-medium text-blue-800"><li>24/7 Emergency Ward</li><li>Advanced ICU</li><li>In-house Pharmacy</li><li>Blood Bank</li></ul>
      </div>
    </div>
  </div>;
}
