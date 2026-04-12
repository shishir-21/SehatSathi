"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDoctorById, bookAppointment } from "@/lib/api";

export default function DoctorProfile() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [consultationType, setConsultationType] = useState("online");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [prescriptionUrl, setPrescriptionUrl] = useState(""); // Simplified for MVP

  // Fetch single doctor
  useEffect(() => {
    async function fetchDoc() {
      try {
        const data = await getDoctorById(doctorId);
        setDoctor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchDoc();
  }, [doctorId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !patientName || !patientAge) {
      alert("Please fill in required fields (Name, Age, Date, Time).");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to book an appointment!");
      router.push("/login"); 
      return;
    }

    const bookingData = {
      doctorId,
      date: selectedDate, 
      timeSlot: selectedTime,
      consultationType,
      patientName,
      patientAge: Number(patientAge),
      problemDescription,
      prescriptionUrl,
    };
    
    // Note: MVP File upload skip per user rules: "File upload and advanced validations can be improved later." We just map an optional UI element for now.
    const result = await bookAppointment(bookingData, token);

    if (result.error === "UNAUTHORIZED") {
       alert("Session expired. Please login again.");
       localStorage.removeItem("token");
       router.push("/login");
       return;
    }

    if (result._id || result.id || (result.date && !result.message)) {
      alert("Appointment booked successfully! We will see you then!");
      router.push("/"); // Returning to directory
    } else {
      alert("Booking failed: " + (result.message || "This slot is taken!"));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!doctor) return <div className="p-8 text-center text-red-500">Doctor not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-900">
      <button onClick={() => router.push("/")} className="mb-6 text-blue-600 hover:underline font-medium">
        &larr; Back to Directory
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Doctor Profile */}
        <div className="md:w-1/3 space-y-6">
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm text-center">
            {/* Conditional Photo or Emoji Placeholder */}
            {doctor.photoUrl ? (
               <img src={doctor.photoUrl} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-blue-100 shadow-sm" />
            ) : (
               <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-blue-50 flex items-center justify-center text-5xl shadow-inner border border-blue-100">
                 👨‍⚕️
               </div>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
            <p className="text-blue-600 font-semibold text-lg">{doctor.specialization}</p>
            <div className="my-4 flex justify-center gap-6 text-sm text-gray-600 bg-gray-50 py-2 rounded-lg border">
               <div><span className="block font-bold text-gray-800 text-lg">{doctor.experience}</span> Experience</div>
               <div><span className="block font-bold text-gray-800 text-lg">{doctor.rating || 'N/A'}</span> Rating</div>
            </div>

            {doctor.qualifications && doctor.qualifications.length > 0 && (
              <div className="mt-6 text-left border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Qualifications</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                  {doctor.qualifications.map((q: string, i: number) => <li key={i}>{q}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="md:w-2/3 border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <h2 className="text-2xl font-bold mb-6 pb-4 border-b text-gray-800">Book an Online Consultation</h2>
          
          <form onSubmit={handleBooking} className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Patient Name *</label>
                <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none" placeholder="Full Name" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Age *</label>
                <input type="number" required value={patientAge} onChange={(e) => setPatientAge(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none" placeholder="Age" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Type</label>
                 <select value={consultationType} onChange={(e) => setConsultationType(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none">
                    <option value="online">Online Consultation</option>
                    <option value="offline">Clinic Visit</option>
                 </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Date *</label>
                <input type="date" required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none"/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Time Slot *</label>
                <select value={selectedTime} required onChange={(e) => setSelectedTime(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none">
                    <option value="">-- Choose --</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Brief Description of Problem (Optional)</label>
              <textarea value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} rows={3} className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 outline-none" placeholder="Describe symptoms or reasons for visit..."/>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Upload Prescription (Optional)</label>
              <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>

            <button type="submit" className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Confirm & Book Appointment
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
