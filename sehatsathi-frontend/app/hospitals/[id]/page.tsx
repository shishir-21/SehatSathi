"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getHospitalById, getDoctorsByHospital } from "@/lib/api";

export default function HospitalProfile() {
  const { id } = useParams() as { id: string };
  const [hospital, setHospital] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const hData = await getHospitalById(id);
        setHospital(hData);

        const dData = await getDoctorsByHospital(id);
        setDoctors(dData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadData();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  if (!hospital) return <div className="p-8 text-center text-red-500">Hospital not found!</div>;

  // Group doctors by Spec/Department
  const docsByDept: Record<string, any[]> = {};
  doctors.forEach((doc) => {
    const dept = doc.specialization || "General";
    if (!docsByDept[dept]) docsByDept[dept] = [];
    docsByDept[dept].push(doc);
  });

  return (
    <div>
      {/* Banner */}
      <div 
        className="w-full h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hospital.image || 'https://via.placeholder.com/1200'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-12">
           <div className="max-w-6xl mx-auto w-full">
              <h1 className="text-5xl font-extrabold text-white mb-2">{hospital.name}</h1>
              <p className="text-2xl text-gray-200">📍 {hospital.location}</p>
              <div className="mt-4 inline-block bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-lg">
                ⭐ {hospital.rating} Top Rated Facility
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 mt-8 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Hospital Info */}
        <div className="lg:w-1/3">
           <h2 className="text-2xl font-bold border-b pb-4 mb-4 text-gray-900">About Facility</h2>
           <p className="text-gray-700 leading-relaxed text-lg">{hospital.description}</p>
           
           {/* Maybe add Map placeholder here in future */}
           <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
             <h3 className="font-bold text-blue-900 mb-2">Patient Services</h3>
             <ul className="text-sm text-blue-800 space-y-2 list-disc pl-5 font-medium">
                <li>24/7 Emergency Ward</li>
                <li>Advanced ICU</li>
                <li>In-house Pharmacy</li>
                <li>Blood Bank</li>
             </ul>
           </div>
        </div>

        {/* Right Column: Doctors/Departments */}
        <div className="lg:w-2/3">
           <h2 className="text-3xl font-bold border-b pb-4 mb-8 text-gray-900">Departments & Doctors</h2>
           
           {Object.keys(docsByDept).length === 0 ? (
             <div className="text-gray-500 p-8 border rounded-xl bg-gray-50 text-center">
                Currently, no doctors are mapped to this hospital in the system.
             </div>
           ) : (
             <div className="space-y-8">
               {Object.keys(docsByDept).map(dept => (
                  <div key={dept} className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                     <div className="bg-slate-100 border-b px-6 py-4">
                        <h3 className="text-xl font-bold text-gray-800">{dept}</h3>
                     </div>
                     <div className="p-6">
                        <ul className="space-y-4">
                           {docsByDept[dept].map(doc => (
                              <li key={doc._id} className="flex justify-between items-center border-b last:border-0 pb-4 last:pb-0">
                                 <div className="flex items-center gap-4">
                                     {doc.photoUrl ? (
                                        <img src={doc.photoUrl} className="w-12 h-12 rounded-full object-cover border" />
                                     ) : (
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">👨‍⚕️</div>
                                     )}
                                     <div>
                                        <div className="font-bold text-lg text-gray-900">{doc.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{doc.experience} Years Exp. | ⭐ {doc.rating || 'N/A'}</div>
                                     </div>
                                 </div>
                                 <Link 
                                   href={`/doctor/${doc._id}`}
                                   target="_blank"
                                   className="bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-lg transition shadow-sm border border-blue-200"
                                 >
                                    Book Consult &rarr;
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
