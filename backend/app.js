import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
import titleRoutes from "./routes/titles.js";
import passportConfig from "./passport-config.js";

dotenv.config();

const app = express();

passportConfig(passport);

const allowedOrigins = [
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
    autoRemove: "native",
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/titles", titleRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("🌐 Backend Root Route Working!");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const __dirname = path.resolve();

// Production static file serving - NO WILDCARDS
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  
  // Handle specific React routes explicitly (safer approach)
  const reactRoutes = ['/', '/login', '/register', '/dashboard', '/search', '/profile'];
  
  reactRoutes.forEach(route => {
    app.get(route, (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  });
  
  // Fallback middleware for any other routes
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api/') && req.accepts('html')) {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  });
}

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });