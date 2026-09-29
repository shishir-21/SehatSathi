// Base URL of your backend (with fallback to production URL if env is missing)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sehatsathi-y19n.onrender.com";

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
export async function chatWithAI(message: string, language: string = 'en') {
  const res = await fetch(`${BASE_URL}/ai/chat`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, language }),
  });
  return res.json();
}
export async function uploadPrescription(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/ai/upload`, { method: "POST", body: formData });
  return res.json();
}
export async function generateOtp(email: string) {
  const res = await fetch(`${BASE_URL}/users/generate-otp`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to generate OTP");
  }
  return res.json();
}
export async function signup(data: any) {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return res.json();
}
export async function login(data: any) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
  });
  return res.json();
}
