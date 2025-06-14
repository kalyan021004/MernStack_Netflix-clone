// app.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import titleRoutes from "./routes/titles.js";
import passportConfig from "./passport-config.js";

dotenv.config(); // Load .env

passportConfig(passport);

const app = express();

// CORS setup
app.use(cors({
  origin: "https://mern-stack-netflix-clone-eta.vercel.app/",
  credentials: true,
}));
app.use(bodyParser.json());

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", authRoutes);
app.use("/", titleRoutes);

app.get("/", (req, res) => {
  res.send("I am root Path");
});

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
