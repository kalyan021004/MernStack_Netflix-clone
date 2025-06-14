// backend/init/initDb.js
import express from "express";
import mongoose from "mongoose";
import NetflixTitle from "../models/NetflixTitle.js"; // use .js extension
import data from "./data.js";// must also be .js
const app=express();
const MONGO_URI = "mongodb+srv://kalyan021004:Netflix021004@netflix.hymtxye.mongodb.net/?retryWrites=true&w=majority&appName=Netflix";

try {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("✅ MongoDB connected");

  await NetflixTitle.deleteMany({});
  await NetflixTitle.insertMany(data);

  console.log("✅ Data inserted successfully");
} catch (err) {
  console.error("❌ Error inserting:", err);
} finally {
  await mongoose.disconnect();
}