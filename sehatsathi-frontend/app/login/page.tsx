"use client";

import { useEffect, useState } from "react";
import { getDoctors, bookAppointment } from "../lib/api";

export default function Home() {
  const [doctors, setDoctors] = useState([]);

  // 1. Fetch doctors on load
  useEffect(() => {
    async function fetchDoctors() {
      const data = await getDoctors();
      setDoctors(data);
    }
    fetchDoctors();
  }, []);

  // 2. Handle Booking Logic
  const handleBooking = async (doctorId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to book an appointment!");
      return;
    }

    // Temporary data for the MVP
    const bookingData = {
      doctorId: doctorId,
      date: "2026-04-10", 
      timeSlot: "10:00 AM"
    };

    const result = await bookAppointment(bookingData, token);

    if (result._id) {
      alert("Appointment booked successfully! ✅ Check Compass.");
    } else {
      alert("Booking failed: " + (result.message || "Something went wrong"));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc: any) => (
          <div key={doc._id} className="border p-4 rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold text-blue-800">{doc.name}</h2>
            <p className="text-gray-600">{doc.specialization}</p>
            <p className="text-sm">Exp: {doc.experience} years</p>
            
            {/* 3. The Action Button */}
            <button 
              onClick={() => handleBooking(doc._id)}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
