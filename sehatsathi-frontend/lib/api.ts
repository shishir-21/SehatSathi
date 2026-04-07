// Base URL of your backend
const BASE_URL = "http://localhost:3000";

// Fetch all doctors
export async function getDoctors() {
  const res = await fetch(`${BASE_URL}/doctors`);
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

  return res.json();
}
