"use client";

import { useEffect, useState } from "react";
import { getDoctors } from "../lib/api";

export default function Home() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      const data = await getDoctors();
      setDoctors(data);
    }

    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>

      <div className="grid gap-4">
        {doctors.map((doc: any) => (
          <div key={doc._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{doc.name}</h2>
            <p>{doc.specialization}</p>
            <p>Experience: {doc.experience} years</p>
            <p>Rating: {doc.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
