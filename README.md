# 🧠 Wundrsight SWE AI/ML Intern Assignment

This repository contains my completed submission for the **Wundrsight Software Engineering (AI/ML Intern)** assignment. It demonstrates hands-on knowledge of **AI/ML integration**, **backend development**, and **frontend engineering**, built with a production-first mindset under tight timelines.

---

## ⚙️ Tech Stack

### 🔧 Backend
- Node.js
- Express.js
- Prisma ORM
- SQLite (development)
- PostgreSQL (production)
- JWT Authentication
- Password Hashing
- CORS
- Rate Limiting

### 💻 Frontend
- React
- Vite
- Axios

---

## ✨ Key Features

- ✅ User registration and login
- ✅ Role-based access control (Patient / Admin)
- ✅ View & book 30-minute appointment slots
- ✅ Prevent double-booking (via DB constraints)
- ✅ Admin dashboard to view all bookings
- ✅ API validation, logging & error handling
- ✅ JWT-based authentication for protected routes

---

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── app.js
├── server.js
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/wundrsight-assignment.git
cd wundrsight-assignment/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit your `.env` file:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-jwt-secret"
FRONTEND_URL="http://localhost:5173"
```

> ✅ Use a PostgreSQL `DATABASE_URL` string in production.

---

## 🧱 Database Setup

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

---

## ▶️ Run the Server

```bash
npm run dev
```

---

## 🔐 Test Credentials

### Patient
- **Email:** `patient@example.com`
- **Password:** `Passw0rd!`

### Admin
- **Email:** `admin@example.com`
- **Password:** `Passw0rd!`

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/health`                 | Health check                       |
| POST   | `/api/register`           | Register a new user                |
| POST   | `/api/login`              | Login and receive JWT              |
| GET    | `/api/slots/available`    | Get available time slots           |
| POST   | `/api/book`               | Book a time slot                   |
| GET    | `/api/my-bookings`        | View current user's bookings       |
| GET    | `/api/all-bookings`       | Admin view of all bookings         |

---

## 🖼️ Screenshots

> *(Include actual image links from your repo or uploads)*

---

## 📝 Notes

- Submission was slightly delayed due to an **unexpected internet outage** — thank you for your understanding.
- Codebase is fully tested, documented, and cleanly structured.

---

## 📬 Contact

- **Name:** Your Name  
- **Email:** your.email@example.com  
- **GitHub:** [@yourusername](https://github.com/yourusername)

---

> 🧠 Built with ❤️ under time pressure for Wundrsight.
