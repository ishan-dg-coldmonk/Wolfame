# Wolfame - Sports Leaderboard & Management System

Wolfame is a complete solution for managing sports events, tracking leaderboard points for hostels/teams, and displaying live updates. It includes a User Interface for general viewing and an Admin Interface for managing matches, teams, and points.

## Project Structure

- **frontend/**: React-based user interface.
- **server/**: Node.js/Express backend with MongoDB.

---

## Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: A running MongoDB instance (local or Atlas)

---

## Setup Instructions

### 1. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and provide your configuration:

- `PORT`: Port to run the server (default: 8001)
- `MONGODB_URL`: Your MongoDB connection string
- `PRIVATE_KEY`: A secret key for JWT authentication (e.g., `mySecretKey123`)

Start the server:

```bash
npm start
# OR for development with hot-reload
npm run dev
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and provide your API URL:

- `REACT_APP_API_URL`: URL of your backend server (e.g., `http://localhost:8001`)

Start the frontend:

```bash
npm start
```

The application should now be running at `http://localhost:3000` (or whatever port your frontend uses).

---

## Admin Functionality

Wolfame has a protected Admin Dashboard for creating matches, updating results, and managing team points.

### How to Access Admin Features

**Step 1: Create a User Account**
1.  Go to the Wolfame website.
2.  Click on "Sign Up" or "Login" in the header.
3.  Create a new account with your email and password.

**Step 2: Grant Admin Privileges (Manual Database Step)**
By default, all new users are standard users. To become an admin, you must manually update the user role in the database.

1.  Open your MongoDB database (using MongoDB Compass, Atlas, or CLI).
2.  Find the `users` collection.
3.  Locate the user document you just created (search by email).
4.  Change the `role` field from `"user"` to `"admin"`.
    *   *Note: If the `role` field doesn't exist, create it and set it to `"admin"`.*
5.  Save the document.

**Step 3: Access Admin Dashboard**
1.  Go back to the Wolfame website.
2.  Log out and Log in again to refresh your session capabilities.
3.  Navigate to `/admin/dashboard`.
4.  You should now have access to create matches, update winners, and manage points.

---

## Features

- **Leaderboard**: Real-time ranking of Men's and Women's hostels.
- **Matches**: View upcoming, live, and completed matches.
- **Admin Dashboard**:
    - **Create Teams**: Create new teams for the tournament for a particular sport.
    - **Create Match**: Schedule new games.
    - **Update Winner**: Set match results (automatically updates leaderboard).
    - **Manage Points**: Manually adjust team points if needed.
- **Responsive Design**: Works on desktop and mobile.
