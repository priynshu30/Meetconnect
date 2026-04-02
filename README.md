# MeetConnect

A full-stack mock interview scheduling platform built with React + Redux + TailwindCSS + Node.js + Express + MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Install Client Dependencies
```bash
cd client
npm install
```

### 3. Configure Environment
Copy `server/.env.example` to `server/.env` and update:
- `MONGO_URI` – your MongoDB connection string
- `JWT_SECRET` – a strong secret key

If you run the frontend without Vite's local dev proxy, copy `client/.env.example` to `client/.env` and set:
- `VITE_API_BASE_URL` – your backend base URL including `/api`

### 4. Run Development Servers

**Terminal 1 – Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 – Frontend:**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
meetconnect/
├── client/          # React + Vite frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route pages
│       ├── redux/        # Store + slices
│       ├── services/     # Axios API services
│       └── utils/        # Validators
└── server/          # Node.js + Express backend
    ├── config/       # DB connection
    ├── controllers/  # Route handlers
    ├── middleware/   # Auth + error handling
    ├── models/       # Mongoose schemas
    ├── routes/       # API routes
    └── data/         # Seed data
```

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Redux Toolkit, TailwindCSS |
| Backend | Node.js, Express.js, JWT |
| Database | MongoDB, Mongoose |
| Testing | Vitest, React Testing Library |

## 📄 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/auth/update` | Yes | Update profile |
| POST | `/api/interviews` | Yes | Schedule interview |
| GET | `/api/interviews?status=upcoming` | Yes | Fetch interviews |
| GET | `/api/resources/questions?category=Frontend&page=1` | No | Get questions |
| GET | `/api/resources/blogs?category=Frontend` | No | Get blogs |
