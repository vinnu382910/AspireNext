# College Dashboard Backend

A **Node.js + Express.js backend** for the College Dashboard application. It provides APIs for managing colleges, favorites, reviews, and user authentication.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Seed Data](#seed-data)
* [API Endpoints](#api-endpoints)
* [Error Handling](#error-handling)

---

## Features

* Fetch all colleges with **filters, search, and sorting**
* Add and remove **favorites**
* Add and fetch **reviews**
* **User registration and login**
* Proper error handling with meaningful responses

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Other:** dotenv, cors, nodemon

---

## Project Structure

```
college-dashboard-backend/
├─ src/
│  ├─ config/
│  │  └─ db.js              # MongoDB connection
│  ├─ controllers/          
│  │  ├─ collegeController.js
│  │  ├─ reviewController.js
│  │  ├─ favoriteController.js
│  │  └─ userController.js
│  ├─ models/                
│  │  ├─ College.js
│  │  ├─ Review.js
│  │  ├─ Favorite.js
│  │  └─ User.js
│  ├─ routes/                
│  │  ├─ collegeRoutes.js
│  │  ├─ reviewRoutes.js
│  │  ├─ favoriteRoutes.js
│  │  └─ userRoutes.js
│  ├─ seed/                 
│  │  └─ seedData.js
│  ├─ middlewares/
│  │  ├─ errorHandler.js
│  │  └─ authMiddleware.js
│  ├─ app.js                # Express app setup
│  └─ server.js             # Entry point
├─ .env                      # Environment variables
├─ package.json

```

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/your-username/college-dashboard-backend.git
cd college-dashboard-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the root with the following variables:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
```

4. Seed the database (optional):

```bash
node src/seed/seedData.js
```

5. Start the server:

```bash
npm run dev
```

Server will run at `http://localhost:5000`.

---

## Seed Data

Sample colleges in `src/seed/seedData.js`:

```json
[
  {
    "name": "ABC Engineering College",
    "location": "Hyderabad",
    "course": "Computer Science",
    "fee": 120000
  },
  {
    "name": "XYZ Institute of Technology",
    "location": "Bangalore",
    "course": "Electronics",
    "fee": 100000
  },
  {
    "name": "Sunrise Business School",
    "location": "Chennai",
    "course": "MBA",
    "fee": 150000
  },
  {
    "name": "Greenfield Medical College",
    "location": "Hyderabad",
    "course": "MBBS",
    "fee": 250000
  }
]
```

---

## API Endpoints

### 1️⃣ **Colleges**

* **GET /colleges** — Fetch all colleges (supports filters & sorting)

  ```
  GET http://localhost:5000/colleges?location=Hyderabad&course=Computer%20Science&minFee=100000&maxFee=150000&search=ABC&sort=lowtohigh
  ```

* **Response Example:**

```json
[
  {
    "_id": "6512a8c8f1",
    "name": "ABC Engineering College",
    "location": "Hyderabad",
    "course": "Computer Science",
    "fee": 120000
  }
]
```

---

### 2️⃣ **Favorites** (Protected - requires JWT token)

* **GET /favorites** — Get all favorite colleges of the logged-in user

* **POST /favorites** — Add a college to favorites

```json
{
  "collegeId": "6512a8c8f1"
}
```

* **DELETE /favorites/:id** — Remove favorite

---

### 3️⃣ **Reviews** (Protected - requires JWT token)

* **GET /reviews** — Fetch all reviews

  * Optional query params: `collegeId`, `minRating`, `maxRating`, `search`, `sort`

* **POST /reviews** — Add a review

```json
{
  "college": "6512a8c8f1",
  "rating": 5,
  "comment": "Great college experience!"
}
```

---

### 4️⃣ **User Authentication**

* **POST /auth/register** — Register a new user

```json
{
  "name": "Vinay",
  "email": "vinay@example.com",
  "password": "123456"
}
```

* **POST /auth/login** — Login user

```json
{
  "email": "vinay@example.com",
  "password": "123456"
}
```

* **Response Example (Login/Register)**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "_id": "userId",
    "name": "Vinay",
    "email": "vinay@example.com"
  }
}
```

---

## Error Handling

* All API errors return **status codes** and a **message**:

```json
{
  "success": false,
  "message": "College not found",
  "error": "Detailed error message"
}
```

* **No colleges found** is returned as an empty array `[]` (status 200) instead of throwing server errors.

---

## Notes

* **Authentication:** Use `Authorization: Bearer <token>` header for protected routes
* **Favorites & Reviews:** Only registered users can add favorites or reviews
* **Filters:** All filters (search, location, course, fee range) can be combined

---

✅ This backend is ready to connect with the React frontend for full-stack College Dashboard functionality.

---
