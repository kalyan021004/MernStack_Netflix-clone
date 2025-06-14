// app.js

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import authRoutes from "./routes/auth.js";
import titleRoutes from "./routes/titles.js";
import passportConfig from "./passport-config.js";

passportConfig(passport); // call the config function

const PORT = 8080;
const MONGO_URI = "mongodb+srv://kalyan021004:Netflix021004@netflix.hymtxye.mongodb.net/?retryWrites=true&w=majority&appName=Netflix";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(bodyParser.json());

app.use(session({
  secret: "yourSecretKey",
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

mongoose.connect(MONGO_URI, {
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
