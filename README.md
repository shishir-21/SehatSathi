# 🧠 MediBrain

🚀 AI-Powered Healthcare Assistant & Telemedicine Platform  

🔗 Live App: https://sehat-sathi-alpha.vercel.app/login  

## 🔑 Demo Credentials

You can use the following credentials to explore the platform:

**Email:** admin@test.com  
**Password:** 123456

⚠️ Note: This is a test account with limited access. Please do not modify critical data.

---

## 📌 Overview

**MediBrain** is a full-stack healthcare platform that combines **AI assistance + doctor booking + health tracking** into one seamless experience.

It helps users:
- Find doctors & hospitals
- Book appointments
- Get AI-based health guidance
- Track symptoms & vitals

---

## ✨ Features

### 👨‍⚕️ Doctor Discovery
- Search doctors by specialization
- View ratings and availability
- Book appointments instantly

### 🏥 Hospital Explorer
- Browse hospitals across India
- View hospital details and services
- Explore associated doctors

### 📅 Appointment Booking
- Slot-based scheduling
- Real-time booking system
- Prevents double booking

### 🤖 AI Health Assistant
- Symptom-based guidance
- Recovery suggestions
- Diet & lifestyle advice
- Multi-language support (future-ready)

### 📊 Health Tracker
- Track temperature
- Add symptoms
- Store medicines
- Monitor health progress

---

## 🧠 AI Capabilities (Current)

- Fever / cold / headache analysis  
- Basic health recommendations  
- Suggest when to consult a doctor  
- Smart conversational interface  

---

## 🔮 Upcoming Features

- 📸 Prescription upload & AI analysis  
- 🧾 MRI / medical report interpretation  
- 🔔 Smart reminders (medicine & vitals)  
- 📹 Video consultation  
- 💳 Payment integration  

---

## 🏗️ Tech Stack

### Frontend
- Next.js / React
- Tailwind CSS

### Backend
- NestJS
- REST API architecture

### Database
- MongoDB Atlas

### Deployment
- Frontend → Vercel  
- Backend → Render  

---

## 🔗 Architecture

```
Frontend (Next.js)
↓
Backend (NestJS API)
↓
MongoDB Atlas
```

---

## 🔐 Authentication

- JWT-based authentication  
- Secure API endpoints  
- Environment-based configuration  

---

## ⚙️ Environment Variables

### Backend (Render)

```env
MONGO_URI=your_mongodb_connection_string
PORT=10000
JWT_SECRET=your_secret
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

---

## 🚀 Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/shishir-21/SehatSathi.git
cd SehatSathi
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Backend

```bash
npm run start
```

### 4. Run Frontend

```bash
npm run dev
```

---

## 📡 API Endpoints

- `/auth/login`
- `/users/signup`
- `/doctors`
- `/hospitals`
- `/appointments`
- `/ai/chat`

---

## 🛠️ Improvements in v1.0.0

- Production-ready deployment  
- MongoDB Atlas integration  
- Fixed localhost DB issues  
- Added CORS support  
- Stable API connections  

---

## 🎯 Future Vision

MediBrain aims to become a **complete AI healthcare ecosystem**:
- Personal AI nurse 🧠  
- Smart diagnostics ⚡  
- Remote healthcare access 🌍  

---

## 👨‍💻 Author

**Shishir Mahato**  
B.Tech CSE (Data Science)  
Full Stack + AI Developer  

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
