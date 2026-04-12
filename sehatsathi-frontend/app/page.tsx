"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDoctors, bookAppointment } from "@/lib/api";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state variables for dynamic inputs as requested
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("online");
  
  const router = useRouter();

  // 1. Fetch doctors on load
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

  // 2. Handle Booking Logic
  const handleBooking = async (doctorId: string) => {
    
    // Validate that inputs are selected before continuing
    if (!selectedDate || !selectedTime || !consultationType) {
      alert("Please select consultation type, date, and time slot above.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to book an appointment!");
      router.push("/login"); 
      return;
    }

    // Dynamic data payload for booking to backend
    const bookingData = {
      doctorId: doctorId,
      date: selectedDate, 
      timeSlot: selectedTime,
      consultationType: consultationType
    };
    
    const result = await bookAppointment(bookingData, token);

    // Token is invalid/expired handling
    if (result.error === "UNAUTHORIZED") {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    // Checking if the backend returned the saved document ID (success)
    if (result._id) {
      alert("Appointment booked successfully!");
    } else {
      // Backend throws duplicate error message like 'Slot already booked'
      alert("Booking failed: " + (result.message || "This slot is taken!"));
    }
  };

  // 3. Simple Logout Helper
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out!");
    router.refresh();
  };

  if (loading) return <div className="p-6">Loading doctors...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Available Doctors</h1>
        <button onClick={handleLogout} className="text-sm border px-3 py-1 bg-red-50 text-red-600 rounded">Logout</button>
      </div>

      {/* Online Consultation Booking UI */}
      <div className="mb-8 p-4 border rounded bg-blue-900 border-blue-800 text-white">
        <h2 className="text-lg font-semibold mb-3">1. Configure Your Appointment</h2>
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm mb-1 font-medium">Consultation Type</label>
            <select 
              value={consultationType} 
              onChange={(e) => setConsultationType(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-white text-gray-900 w-full"
            >
              <option value="online">Online Consultation</option>
              <option value="offline">Clinic Visit</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Select Date</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-white text-gray-900 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Time Slot (Hourly)</label>
            <select 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-white text-gray-900 w-full"
            >
              <option value="">-- Choose Slot --</option>
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
      </div>

      <h2 className="text-lg font-semibold mb-3">2. Select a Doctor</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc: any) => (
          <div key={doc._id} className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-900">{doc.name}</h2>
            <p className="text-gray-600 font-medium mb-1">{doc.specialization}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
               <span>Exp: {doc.experience} years</span>
               {doc.consultationModes && (
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                     {doc.consultationModes.join(', ')}
                  </span>
               )}
            </div>
            
            <button 
              onClick={() => handleBooking(doc._id)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
}
