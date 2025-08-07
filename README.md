name: Wundrsight SWE AI/ML Intern Assignment
description: >
  This repository contains my completed submission for the Wundrsight Software Engineering (AI/ML Intern) assignment.
  It demonstrates practical understanding of AI/ML integration and backend engineering under time constraints.
![Uploading Screenshot (7).png…]()

tech_stack:![Uploading Screenshot (5).png…]()

  backend:![Uploading Screenshot (6).png…]()

    - Node.js
    - Express.js
    - Prisma ORM
    - SQLite (development)<img width="1920" height="1080" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/df31b664-7e59-4cf6-b88c-f07ca32dabf6" />

    - PostgreSQL (production)
    - JWT Authentication
  frontend:
    - React
    - Vite
    - Axios
  other:
    - CORS
    - Rate limiting
    - Password hashing

features:
  - User registration & login
  - Role-based access control (Patient/Admin)
  - View & book 30-minute appointment slots
  - Prevent double-booking via DB constraint
  - Admin dashboard to view all bookings
  - API error handling, validation, and logging
  - JWT-based protected routes

setup:
  clone_repo: |
    git clone https://github.com/yourusername/wundrsight-assignment.git
    cd wundrsight-assignment/backend
  install_dependencies: npm install
  configure_env: |
    cp .env.example .env
    # Edit .env with your values:
    # DATABASE_URL="file:./dev.db"
    # JWT_SECRET="your-secret"
    # FRONTEND_URL="http://localhost:5173"
  initialize_db: |
    npm run prisma:generate
    npm run prisma:migrate
    npm run prisma:seed
  run_server: npm run dev

credentials:
  patient:
    email: patient@example.com
    password: Passw0rd!
  admin:
    email: admin@example.com
    password: Passw0rd!

api_endpoints:
  - method: GET
    path: /health
    description: Health check endpoint
  - method: POST
    path: /api/register
    description: Register a new user
  - method: POST
    path: /api/login
    description: Login and receive JWT token
  - method: GET
    path: /api/slots/available
    description: View available slots
  - method: POST
    path: /api/book
    description: Book an appointment slot
  - method: GET
    path: /api/my-bookings
    description: View user's bookings
  - method: GET
    path: /api/all-bookings
    description: Admin view of all bookings

folder_structure: |
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

notes:
  - Submission was slightly delayed due to internet outage; kindly consider.
  - Full code tested and documented.
  - GitHub Repo: https://github.com/yourusername/wundrsight-assignment

contact:
  name: Your Name
  email: your.email@example.com
  github: https://github.com/yourusername

license: MIT
