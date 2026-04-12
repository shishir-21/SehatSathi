# 🏥 MediBrain Platform

**MediBrain** is a scalable, production-ready healthcare telemedicine platform connecting patients to doctors through online and offline consultations.

## 🌟 Features
- **Online Consultation Booking**: Native support for telemedicine appointments.
- **Atomic Booking Integrity**: Zero chance of double-booking under high load using DB-level unique constraints.
- **Live Search & Filters**: Easy-to-use directory of available health practitioners.
- **Dynamic Time Blocks**: Hourly scheduling slots natively enforced by the backend.

## 🏗️ Architecture Stack
The platform uses a modular monolith approach designed to easily migrate to Microservices (Phase 3).
- **Backend**: NestJS (v11) + Typescript
- **Database**: MongoDB (Mongoose ORM)
- **Frontend**: Next.js 16.2 (App Router) + React 19 + TailwindCSS
- **Authentication**: JWT & PassportJS

## 📂 Project Structure
The repository is split into two primary workspaces:
1. `/sehatsathi-backend` - The NestJS API Server (Default Port: `3000`)
2. `/sehatsathi-frontend` - The Next.js Next-Gen Client UI (Default Port: `3001`)

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v20+)
- MongoDB (Running locally at `mongodb://localhost:27017/`)
- npm or yarn

### 2. Running The Backend
```bash
cd sehatsathi-backend
npm install
npm run start:dev
```

### 3. Running The Frontend
```bash
cd sehatsathi-frontend
npm install
npm run dev
```

Visit the app at [http://localhost:3000](http://localhost:3000) (Next.js default, might run on 3001 if backend is active on 3000).

## 🧾 Development Principles
- **Git Workflow**: Strict atomic commits per feature (e.g. `feat: xyz`, `fix: xyz`).
- **Performance**: Pagination, Redis caching (upcoming), and debounced queries.
- **Phase-Based Scaling**: We are currently marching through **Phase 1 MVP**, focusing strictly on core consultation feature sets before moving to distributed Phase 2 models.
