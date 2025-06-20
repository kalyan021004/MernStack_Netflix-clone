# 📺 Netflix Clone – MERN Stack

Welcome to a full-featured **Netflix Clone** built using the **MERN stack** (MongoDB, Express.js, React, Node.js).  
This project includes user authentication, genre-wise browsing, a responsive UI, and a basic watch history system.

---

## 🔗 Live Demo

> Coming Soon  
<!-- Add deployed URL here if available -->

---

## 🚀 Features

- ✅ User Sign In/Sign Out using `Passport.js` + Sessions
- 🎞 Display movies by genre (Action, Adventure, Animation, etc.)
- 🧾 Sticky Navbar for easy navigation
- 🔍 Search movies
- 🎬 Watch History feature (record what you watched)
- 🧠 Clean React components with Bootstrap styling
- 📦 MongoDB stores user and movie data

---

## 🧱 Tech Stack

| Frontend | Backend  | Database | Auth        |
|----------|----------|----------|-------------|
| React    | Express  | MongoDB  | Passport.js |

---

## 📁 Folder Structure

Netflix-clone/
│
├── backend/                       # Express + MongoDB + Auth (Node.js)
│   ├── config/                    # Config files (like DB or passport setup)
│   │   └── passport-config.js
│   ├── models/                    # Mongoose schema definitions
│   │   └── User.js
│   │   └── Title.js
│   ├── routes/                    # All Express routes
│   │   └── auth.js
│   │   └── titles.js
│   ├── controllers/              # (Optional) Route logic
│   │   └── authController.js
│   │   └── titleController.js
│   ├── .env                      # Contains Mongo URI, secrets (ignored)
│   ├── .gitignore                # Contains node_modules, .env
│   ├── app.js                    # Main server setup
│   ├── package.json
│
├── frontend/                     # React frontend
│   ├── public/                   # Static assets and index.html
│   ├── src/
│   │   ├── components/           # Reusable components (e.g., Navbar, Card)
│   │   ├── pages/                # Page components like Home, SignIn, Genres
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js            # If using Vite
│
├── README.md
├── .gitignore                    # Root-level ignore (if needed)



---

## 🛠️ Setup Instructions

### Clone the repository
```bash
git clone https://github.com/kalyan021004/MernStack_Netflix-clone.git
cd MernStack_Netflix-clone



# Terminal 1 - backend
cd server
npm start

# Terminal 2 - frontend
cd client
npm run dev



🔐 Authentication
Users register or sign in using their email/password.

Passport.js with session-based auth maintains login state.

Protected routes are accessible only if authenticated.


🌐 API Routes
Method	Endpoint	Description
GET	/genre/:name	Fetch movies by genre
POST	/register	Register user
POST	/login	Login user
POST	/logout	Logout session
POST	/watch	Add to watch history
GET	/history	Fetch user watch history



📌 TODOs
 Add player UI for playing videos

 Add watchlist/favorites feature

 Responsive mobile-first layout

 Search filters and pagination

 Deploy on Render/Netlify




 📝 License
This project is for educational/demo purposes only. Not affiliated with Netflix, Inc.

