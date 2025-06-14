import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo"; // Add this for production session store
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
  "http://localhost:5173",
  // add production frontend URL here if any, e.g., "https://yourdomain.com"
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

// Use connect-mongo for storing sessions in MongoDB (production-safe)
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

// Mount your routers on appropriate paths
app.use("/", authRoutes);   // It's better to mount under /auth
app.use("/", titleRoutes); // Mount your titles routes on /titles

// Test root route
app.get("/", (req, res) => {
  res.send("🌐 Backend Root Route Working!");
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
