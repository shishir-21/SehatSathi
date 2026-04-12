# 🏥 MediBrain Platform (v1.0.0)

**MediBrain** (formerly SehatSathi) is a scalable, production-ready healthcare telemedicine ecosystem. It connects patients directly to leading hospitals, specialized practitioners, and a powerful AI Health Assistant for instant symptom or prescription assessment. 

Welcome to our official release **Version 1.0.0**! 🎉

---

## 🌟 Key Features
- **Intelligent AI Health Assistant**: A WhatsApp-style automated assistant capable of severity-ranking user symptoms (Low/Medium/High).
- **Prescription OCR Parsing**: Upload images or PDFs of medical prescriptions. The integrated backend parser breaks down medicines, causes, and active recovery routines via simulated FastAPI hooks.
- **2-Step Authentication & Protected Routes**: Clean, Glassmorphic split-screen login interfaces secured tightly by backend **OTP Generation & Verification** APIs. Unauthenticated users are strictly barred from core features.
- **Hospital & Doctor Directories**: Find top-rated hospitals. Navigate locally using voice-search and instantaneous text-debouncing.
- **Atomic Appointment Booking**: Real-time telemedicine appointments leveraging DB-level unique constraints to prevent double booking.

---

## 🏗️ Architecture Stack
The platform uses a clean, modular monolith approach bridging Next-gen UI with severe backend schema checks.
- **Backend**: NestJS (v11) + Typescript
- **Database**: MongoDB (Mongoose ORM)
- **Frontend**: Next.js 16.2 (App Router) + React 19 + TailwindCSS Vanilla + Custom React Engine
- **Authentication**: JWT & Simulated SMS OTP Gateway

---

## 📂 Project Structure
1. `/sehatsathi-backend` - The NestJS API Server (Default Port: `3000`)
2. `/sehatsathi-frontend` - The Next.js Premium Client UI (Default Port: `3001` or `3000` via build configs)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed to run `v1.0.0` securely:
- Node.js (v20+)
- MongoDB (Running locally at `mongodb://localhost:27017/sehatsathi`)

### 2. Running The Backend
```bash
cd sehatsathi-backend
npm install
npm run start:dev
```
> *Tip: Ensure you run `POST /hospitals/seed` from an API tool if your DB is empty!*

### 3. Running The Frontend
```bash
cd sehatsathi-frontend
npm install
npm run dev
```

---

## 🧾 Development Principles
- **Git Workflow**: Strict atomic commits per feature (e.g. `feat: xyz`, `fix: xyz`, `style: xyz`).
- **Dynamic UX**: Utilizing smooth UI boundaries, bouncy loaders, alert pills, and global layout hooks.
- **The Phase-Based Scaling**: We have officially closed **Phase 1 MVP**, successfully launching `v1.0.0`. Future maps are set toward distributed Python/Redis Microservices!
