# 🪨 Stone Paper Scissors – Full Stack Web App

A modern **2-player Stone Paper Scissors game** built as a full-stack application with a clean UI, lock-in gameplay, and persistent game history.

---

## 🚀 Live Demo

* **Frontend (Vercel):** https://stone-paper-scissors-rosy-one.vercel.app/
* **Backend (Render):** https://sps-backend-cmzm.onrender.com

---

## 📌 Features

### 🎮 Stage 1 – Game Logic

* 2-player gameplay
* Each round:

  * Players select **Stone / Paper / Scissors**
  * Both players **lock in** their choice
* Winner rules:

  * Stone > Scissors
  * Scissors > Paper
  * Paper > Stone
* Tie handling
* Total **6 rounds**
* Score tracking
* Round winner + final winner display

---

### 🧑‍🤝‍🧑 Stage 2 – User Input & Data Storage

* Player name input before game start
* Game results stored in database:

  * Player names
  * Final score
  * Winner
  * Timestamp
* Dedicated **History Page** to view past games

---

### ☁️ Stage 3 – Deployment

* Frontend hosted on **Vercel**
* Backend hosted on **Render**
* Database hosted on **MongoDB Atlas**

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion (animations)
* Lucide React (icons)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```
stone-paper-scissors/
│
├── frontend/          # React frontend
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/           # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
│
└── README.md
```

---

## 🔌 API Endpoints

### Save Game

```
POST /api/games
```

### Get All Games

```
GET /api/games
```

---

## 🎯 Game Flow

1. Enter player names
2. Start game
3. Each player selects choice
4. Click **Lock In**
5. Winner is calculated
6. After 6 rounds:

   * Final winner is displayed
   * Game is saved to database
   * Game resets automatically

---

## 📸 UI Highlights

* 🎨 Dark modern UI
* 🧊 Card-based design
* 🔒 Lock-in system
* 🔢 Round tracker (1–6)
* 🏆 Winner banner
* 📜 Game history section

---

## 🔒 Environment Variables

`.env` file is **not committed** for security.



## ✅ Submission Checklist

* ✔ 2-player game logic
* ✔ 6 rounds system
* ✔ Winner calculation
* ✔ Player name input
* ✔ Database integration
* ✔ History page
* ✔ Deployment completed

---

## 🙌 Author

**Vishal Singh Khati**

---

## 📬 Notes

* Backend may take a few seconds to respond initially (Render free tier cold start)
* Ensure API URLs are updated in frontend before deployment

---

## ⭐ Future Improvements

* Real-time multiplayer (WebSockets)
* Authentication system
* Leaderboard
* Sound effects & animations

---

**✨ Thank you for reviewing this project!**
