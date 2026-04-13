// Base URL of your backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all doctors
export async function getDoctors() {
  const res = await fetch(`${BASE_URL}/doctors`);
  return res.json();
}

// Fetch single doctor
export async function getDoctorById(id: string) {
  const res = await fetch(`${BASE_URL}/doctors/${id}`);
  return res.json();
}

// Hospitals APIs
export async function getHospitals() {
  const res = await fetch(`${BASE_URL}/hospitals`);
  return res.json();
}

export async function getHospitalById(id: string) {
  const res = await fetch(`${BASE_URL}/hospitals/${id}`);
  return res.json();
}

export async function seedHospitals() {
  const res = await fetch(`${BASE_URL}/hospitals/seed`, { method: "POST" });
  return res.json();
}

export async function getDoctorsByHospital(hospitalId: string) {
  const res = await fetch(`${BASE_URL}/doctors?hospitalId=${hospitalId}`);
  return res.json();
}

// AI Assistant API
export async function chatWithAI(message: string, language: string = 'en') {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language }),
  });
  return res.json();
}

export async function uploadPrescription(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/ai/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function generateOtp(phone: string) {
  const res = await fetch(`${BASE_URL}/users/generate-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to generate OTP");
  }
  return res.json();
}

// Signup user
export async function signup(data: any) {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return res.json();
}

// Login user
export async function login(data: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// Book appointment
export async function bookAppointment(data: any, token: string) {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // If the token is expired or invalid, let the UI handle it
  if (res.status === 401) {
    return { error: "UNAUTHORIZED" };
  }

  return res.json();
}
