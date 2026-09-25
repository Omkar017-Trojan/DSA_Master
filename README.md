# DSA Master

A full-stack web application to track and master Data Structures & Algorithms practice with spaced repetition, competitive groups, and gamification.

## Features

- **Problem Tracking** — Track solved, attempted, and revision problems across 18+ curated DSA questions
- **Spaced Repetition** — Smart revision scheduling using SM-2 algorithm
- **Study Plans** — Create, share, and follow structured DSA study plans
- **Competitive Groups** — Create groups, invite friends, and compete on leaderboards
- **XP & Levels** — Earn experience points and level up as you solve problems
- **Achievement Badges** — Unlock badges for milestones
- **Notes System** — Take markdown notes for each problem
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dsa-master

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create `.env` file in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-master
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### Running the App

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

Visit http://localhost:5173

### Seed Database (Optional)

```bash
cd server
npm run seed
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/problems | Get all problems |
| GET | /api/problems/:slug | Get problem by slug |
| PUT | /api/progress/:problemId | Update progress |
| GET | /api/progress | Get user progress |
| GET | /api/streaks/current | Get current streak |
| GET | /api/notes | Get all notes |
| POST | /api/notes | Save note |
| GET | /api/plans | Get all plans |
| POST | /api/plans/:id/copy | Copy a plan |
| GET | /api/groups | Get user's groups |
| POST | /api/groups | Create group |
| POST | /api/groups/join/:code | Join group |

## Project Structure

```
dsa-master/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route pages
│   │   ├── context/       # React Context (state)
│   │   ├── services/      # API calls
│   │   └── App.jsx        # Root component + routes
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/     # Auth, validation
│   │   └── services/      # Business logic
│   └── package.json
│
└── README.md
```

## What I Learned

- Full-stack development with React and Node.js
- JWT authentication
- MongoDB schema design and data modeling
- RESTful API design patterns
- State management with React Context
- Responsive design with TailwindCSS
