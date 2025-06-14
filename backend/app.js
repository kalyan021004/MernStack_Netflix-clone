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

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60, // 14 days expiration
    autoRemove: "native",
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes - mount these BEFORE the catch-all route
app.use("/api/auth", authRoutes);  // Changed from "/" to "/api/auth"
app.use("/api/titles", titleRoutes); // Changed from "/" to "/api/titles"

// Test root route
app.get("/", (req, res) => {
  res.send("🌐 Backend Root Route Working!");
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

const __dirname = path.resolve();

// Production static file serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  
  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get("*", (req, res, next) => {
    // Skip API routes - let them handle their own responses
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

// Updated MongoDB connection (removed deprecated options)
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