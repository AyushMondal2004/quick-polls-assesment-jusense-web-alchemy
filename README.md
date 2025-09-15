# QuickPolls


Simple polls app with a Node/Express + MongoDB backend and React (Vite) frontend.


## Requirements
- Node.js (>=16)
- npm
- MongoDB (local or Atlas)


## Setup — Backend
1. Open a terminal and go to `backend/`.
2. Copy `.env.example` to `.env` and fill `MONGO_URI` and `JWT_SECRET`.
3. Install deps: `npm install`.
4. Start server: `npm run dev` (requires nodemon) or `npm start`.


The backend will run on `http://localhost:5000` by default.


## Setup — Frontend
1. In another terminal go to `frontend/`.
2. Install deps: `npm install`.
3. (Optional) Create `.env` with `VITE_API_URL=http://localhost:5000/api`.
4. Start dev server: `npm run dev`.


The frontend will run on `http://localhost:5173` by default.


## Notes
- Use strong `JWT_SECRET` in production.
- For production deploy you should secure CORS, enable rate-limiting, and use HTTPS.