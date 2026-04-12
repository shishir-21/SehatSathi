# 🏥 SehatSathi – Developer Guidelines & Workflow

## 🎯 Project Goal

Build a scalable healthcare platform where users can:
* Find doctors
* Book appointments
* Get AI-based recommendations

---

# 🧠 1. Development Strategy (PHASE-BASED)

## 🚀 Phase 1 (MVP – 0 → 1 users)
**Goal:** Working product (focus on functionality)
- **Tech Stack:** Backend: NestJS | Database: MongoDB | Frontend: Next.js (React)
- **Features:** Doctor listing, Basic appointment booking, Simple UI
👉 **Rule:** Do NOT over-engineer. Keep it simple.

## ⚡ Phase 2 (Growth – 1K → 100K users)
**Goal:** Stability & reliability
- **Add:** JWT Authentication, Error handling, Logging, Database indexing, Basic caching.

## 🔥 Phase 3 (Scale – 1M+ users)
**Goal:** Performance & scalability
- **Add:** Microservices architecture, Load balancing, Distributed systems.

---

# ⚙️ 2. Backend Architecture

## ✅ Current Approach (Modular Monolith)
Modules: Auth Module, User Module, Doctor Module, Appointment Module

## 🔄 Future (Microservices)
Auth Service, Doctor Service, Appointment Service, Notification Service.

---

# 🗄️ 3. Database Strategy

- **Phase 1:** MongoDB (fast development)
- **Phase 2+:** PostgreSQL → appointments (for transactions) | MongoDB → doctor profiles
👉 **Reason:** Booking requires strong consistency.

---

# ⚡ 4. Performance & Scaling

- **Use:** Redis caching (doctor list, slots, sessions)
- **Indexing:** doctor.specialization, doctor.location, appointment.date

---

# ⏱️ 5. Critical Problem
## ❗ Prevent Double Booking
Use: Atomic DB operations OR DB locking.

---

# 🌍 6. Deployment Strategy
- **Early:** Render / Railway
- **Scale:** Frontend → Vercel | Backend → AWS EC2 / Kubernetes | DB → Mongo Atlas / RDS | Cache → Redis

---

# 🔌 7. Integrations
- **Maps:** Google Maps API
- **Notifications:** Email → NodeMailer | SMS → Twilio

---

# 🔐 8. Security
- JWT + Refresh Tokens
- Rate limiting
- Input validation

---

# 🎨 9. Frontend Guidelines
- Use Next.js, Lazy loading, API caching.

---

# 📈 10. Performance Rules
- Use pagination, Use debounced search, Avoid heavy API calls.

---

# 🧠 11. System Design Focus
Developer must understand:
- How to prevent double booking.
- How to scale search.
- How to handle high traffic.

---

# 🔥 12. Innovation (USP Features)
- AI symptom → doctor recommendation
- Smart nearby doctor suggestion
- Live queue system
- Smart slot prediction

---

# 🧾 13. GIT WORKFLOW (VERY IMPORTANT)

## ✅ RULES:
### 🔹 1. After EVERY feature:
Add changes and Commit immediately.
`git add .`
`git commit -m "feat: add doctor booking API"`

### 🔹 2. After EVERY fix:
`git commit -m "fix: resolve booking conflict issue"`

### 🔹 3. After improvement:
`git commit -m "improve: optimize doctor search performance"`

### 🔹 4. NEVER:
❌ Do large commits | ❌ Do multiple features in one commit

### 🔹 5. Commit Flow:
👉 Feature → Commit → Test → Next Feature

### 🔹 6. Branch Strategy (Optional but Recommended)
- main → stable code | dev → development | feature/* → new features

---

# 🎯 FINAL RULE
👉 Build step-by-step
👉 Commit after every step
👉 Don’t skip phases

---
# 💥 GOAL
Build a scalable, production-ready healthcare platform not just a demo project.
