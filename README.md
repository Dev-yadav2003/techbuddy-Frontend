# TechBuddy — Frontend

TechBuddy is a "Tinder for developers": discover other developers, swipe to connect, and chat in real time with your connections.

This repo is the **React frontend**. It needs the **backend API** running: [Dev-yadav2003/techbuddy](https://github.com/Dev-yadav2003/techbuddy).

## Features

- Sign up / log in (JWT in an httpOnly cookie)
- Swipeable developer feed (drag the card or use the buttons)
- Send, accept and reject connection requests
- Connections list
- Real-time 1:1 chat with saved message history (Socket.IO)
- Edit your profile with a live preview and photo upload
- Responsive layout that works on mobile

## Tech stack

React 18 · Vite · Redux Toolkit · React Router · Tailwind CSS + daisyUI · Framer Motion · Axios · Socket.IO client

## Quick start (frontend + backend locally)

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A MongoDB database. Either:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed locally, or
  - a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (copy its connection string)

### 1. Run the backend

```bash
git clone https://github.com/Dev-yadav2003/techbuddy.git
cd techbuddy
npm install
cp .env.example .env      # Windows (cmd): copy .env.example .env
```

Open `.env` and set `DATABASE_URL` (your MongoDB connection string) and `JWT_PASSWORD` (any long random string). Then start it:

```bash
npm run dev
```

You should see `DB connected successfully` and `Server started on port 3000`.

### 2. Run the frontend

In a **second terminal**:

```bash
git clone https://github.com/Dev-yadav2003/techbuddy-Frontend.git
cd techbuddy-Frontend
npm install
cp .env.example .env      # Windows (cmd): copy .env.example .env
npm run dev
```

Open **http://localhost:5173**, create an account and you're in.

> **Tip:** to try the feed, connections and chat you need at least two users. Sign up a second account in a private/incognito window.

## Environment variables

| Variable                 | Description         | Default                 |
| ------------------------ | ------------------- | ----------------------- |
| `VITE_REACT_APP_API_URL` | URL of the backend. | `http://localhost:3000` |

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server on port 5173    |
| `npm run build`   | Production build into `dist/`        |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

## Project structure

```
src/
├── App.jsx                 # Routes
├── components/
│   ├── Body.jsx            # Logged-in layout: loads the user, redirects to /login
│   ├── Navbar.jsx, Footer.jsx
│   ├── Login.jsx           # Login + sign up
│   ├── Feed.jsx            # Swipe feed (loads more users as you go)
│   ├── UserCard.jsx        # Swipeable profile card (also used as the profile preview)
│   ├── Connection.jsx      # Your connections
│   ├── Requests.jsx        # Incoming connection requests
│   ├── Chat.jsx            # Real-time chat
│   ├── Profile.jsx, Editprofile.jsx
│   └── Loader.jsx, EmptyState.jsx, NotFound.jsx, UserListItem.jsx
└── utils/
    ├── api.js              # Axios instance + error/image helpers
    ├── constants.js        # API URL
    ├── socket.js           # Socket.IO client
    └── *Slice.js, appStore.js  # Redux store
```

## Deployment (Vercel)

1. Import this repo in Vercel (framework preset: **Vite**).
2. Add the env variable `VITE_REACT_APP_API_URL` = your deployed backend URL.
3. On the backend, set `CORS_ORIGINS` to your Vercel URL and `NODE_ENV=production`.

`vercel.json` already rewrites all routes to `index.html`, so client-side routing works on refresh.

## Troubleshooting

- **"Cannot reach the server. Is the backend running?"** — start the backend, and check that `VITE_REACT_APP_API_URL` points to it. Restart `npm run dev` after changing `.env`.
- **Logged out right after logging in / CORS errors** — the backend's `CORS_ORIGINS` must contain the exact frontend URL (e.g. `http://localhost:5173`, no trailing slash).
- **Chat shows "Connecting..."** — chat only works between accepted connections, and the backend must be reachable.
