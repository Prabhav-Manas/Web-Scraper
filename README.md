# WebScrapper - MERN Stack Assignment

A full-stack MERN application that scrapes the top stories from Hacker News, stores them in MongoDB, and provides authentication & bookmark functionality.

---

# Features

## Web Scraper
- Scrapes top 10 stories from Hacker News
- Extracts:
  - Title
  - URL
  - Points
  - Author
  - Posted Time
- Stores scraped stories in MongoDB
- Automatically runs on server startup
- Can also be triggered manually using API

---

## Authentication
- User Registration
- User Login
- JWT-based Authentication
- Email Verification System
- Protected Routes

---

## Stories
- Fetch all stories
- Fetch single story
- Stories sorted by points (highest first)
- Bookmark / Unbookmark stories
- Pagination support

---

## Frontend
- Responsive UI using React + Bootstrap
- Login & Register pages
- Email Verification Flow
- Protected Home Page
- Bookmark Toggle
- React Context API for Authentication State Management

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- React Hook Form
- Yup Validation
- Axios
- Bootstrap
- Font Awesome

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js
- Cheerio
- Axios

---

# Folder Structure

```bash
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── config/
|   |   |__utils/
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Environment Variables

## Backend `.env`

Create a `.env` file inside the `backend` folder:

```env
PORT=8000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

FRONTEND_URL=http://localhost:5173

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email
BREVO_SENDER_NAME=WebScrapper
```

---

## Frontend `.env`

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

---

# Backend Setup

## 2. Navigate to backend

```bash
cd backend
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Run backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

# Frontend Setup

## 5. Navigate to frontend

```bash
cd frontend
```

---

## 6. Install dependencies

```bash
npm install
```

---

## 7. Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

# Authentication APIs

## Register User

```http
POST /api/auth/register
```

---

## Login User

```http
POST /api/auth/login
```

---

## Verify Email

```http
GET /api/auth/verify-email?token=TOKEN
```

---

# Story APIs

## Fetch All Stories

```http
GET /api/stories
```

### Pagination Example

```http
GET /api/stories?page=1&limit=10
```

---

## Fetch Single Story

```http
GET /api/stories/:id
```

---

## Toggle Bookmark

```http
POST /api/stories/:id/bookmark
```

Requires JWT Authentication.

---

# Scraper API

## Trigger Scraper Manually

```http
POST /api/scrape
```

---

# Authentication Flow

1. User registers
2. Verification email is sent
3. User clicks verification link
4. Email gets verified
5. User logs in
6. JWT token is stored
7. Protected APIs become accessible

---

# Bonus Features Implemented

- Pagination
- Email Verification
- Protected Routes
- Bookmark Persistence

---

# Loom Video

Loom walkthrough link:

```bash
Add your Loom video link here
```

---

# Live Deployment

Frontend:

```bash
Add deployed frontend URL here
```

Backend:

```bash
Add deployed backend URL here
```

# Author

Prabhav Manas

---

# Notes

- The scraper automatically runs when the backend server starts.
- Bookmarks are user-specific.
- JWT Authentication is implemented using middleware.
- All sensitive information is stored using environment variables.

---

# License

This project is created for assignment evaluation purposes.