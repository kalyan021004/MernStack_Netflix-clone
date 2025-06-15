import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import passport from "passport";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes working!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mongoState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Get all users (for debugging - remove in production)
router.get("/register", async (req, res) => {
  try {
    const users = await User.find({}, "email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

// REGISTER route with enhanced debugging
router.post("/register", async (req, res) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`[${requestId}] 🚀 REGISTER attempt started`, {
    timestamp: new Date().toISOString(),
    origin: req.get('origin'),
    userAgent: req.get('user-agent'),
    ip: req.ip,
    body: {
      email: req.body.email || 'MISSING',
      password: req.body.password ? '[HIDDEN]' : 'MISSING',
      hasBody: !!req.body,
      bodyKeys: Object.keys(req.body || {})
    }
  });

  try {
    // Step 1: Validate input
    console.log(`[${requestId}] 📝 Validating input...`);
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log(`[${requestId}] ❌ Missing required fields`);
      return res.status(400).json({
        message: "Email and password are required",
        received: {
          email: !!email,
          password: !!password
        },
        requestId
      });
    }

    // Step 2: Database connection check
    console.log(`[${requestId}] 🔌 Checking database connection...`);
    if (mongoose.connection.readyState !== 1) {
      console.log(`[${requestId}] ❌ Database not connected, state: ${mongoose.connection.readyState}`);
      return res.status(500).json({
        message: "Database connection error",
        requestId
      });
    }

    // Step 3: Check if user exists
    console.log(`[${requestId}] 👤 Checking if user exists for email: ${email}`);
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log(`[${requestId}] ❌ User already exists`);
      return res.status(400).json({ 
        message: "User already exists",
        requestId
      });
    }

    // Step 4: Create user
    console.log(`[${requestId}] 💾 Creating new user...`);
    const user = new User({ email, password });
    const savedUser = await user.save();
    
    console.log(`[${requestId}] ✅ User created successfully with ID: ${savedUser._id}`);
    
    res.status(201).json({ 
      message: "Registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email
      },
      requestId
    });

  } catch (error) {
    console.error(`[${requestId}] 💥 Registration error:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
        requestId
      });
    }

    res.status(500).json({ 
      message: "Registration failed", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      requestId
    });
  }
});

// SIGNUP route (alias for register) - this is what your frontend might be calling
router.post("/signup", async (req, res) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`[${requestId}] 🚀 SIGNUP attempt started (alias for register)`, {
    timestamp: new Date().toISOString(),
    origin: req.get('origin'),
    userAgent: req.get('user-agent'),
    ip: req.ip,
    body: {
      email: req.body.email || 'MISSING',
      password: req.body.password ? '[HIDDEN]' : 'MISSING',
      hasBody: !!req.body,
      bodyKeys: Object.keys(req.body || {})
    }
  });

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log(`[${requestId}] ❌ Missing required fields`);
      return res.status(400).json({
        message: "Email and password are required",
        received: {
          email: !!email,
          password: !!password
        },
        requestId
      });
    }

    console.log(`[${requestId}] 🔌 Database state: ${mongoose.connection.readyState}`);
    if (mongoose.connection.readyState !== 1) {
      console.log(`[${requestId}] ❌ Database not connected`);
      return res.status(500).json({
        message: "Database connection error",
        requestId
      });
    }

    console.log(`[${requestId}] 👤 Checking if user exists...`);
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log(`[${requestId}] ❌ User already exists`);
      return res.status(400).json({ 
        message: "User already exists",
        requestId
      });
    }

    console.log(`[${requestId}] 💾 Creating new user...`);
    const user = new User({ email, password });
    const savedUser = await user.save();
    
    console.log(`[${requestId}] ✅ User created successfully`);
    
    res.status(201).json({ 
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email
      },
      requestId
    });

  } catch (error) {
    console.error(`[${requestId}] 💥 Signup error:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
        requestId
      });
    }

    res.status(500).json({ 
      message: "User creation failed", 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      requestId
    });
  }
});

// LOGIN route with enhanced debugging
router.post("/login", (req, res, next) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`[${requestId}] 🔑 LOGIN attempt started`, {
    timestamp: new Date().toISOString(),
    origin: req.get('origin'),
    email: req.body.email || 'MISSING',
    password: req.body.password ? '[HIDDEN]' : 'MISSING',
    ip: req.ip
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(`[${requestId}] 💥 Passport error:`, err);
      return next(err);
    }
    
    if (!user) {
      console.log(`[${requestId}] ❌ Authentication failed:`, info);
      return res.status(401).json({ 
        message: "Invalid email or password",
        requestId
      });
    }
    
    console.log(`[${requestId}] 👤 User authenticated, logging in...`);
    req.logIn(user, (err) => {
      if (err) {
        console.error(`[${requestId}] 💥 Login error:`, err);
        return next(err);
      }
      
      console.log(`[${requestId}] ✅ Login successful`);
      return res.json({ 
        message: "Logged in successfully", 
        user: { 
          id: user._id, 
          email: user.email 
        },
        requestId
      });
    });
  })(req, res, next);
});

// LOGOUT route
router.post("/logout", (req, res, next) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  console.log(`[${requestId}] 🚪 Logout attempt`);
  
  req.logout((err) => {
    if (err) {
      console.error(`[${requestId}] 💥 Logout error:`, err);
      return next(err);
    }
    console.log(`[${requestId}] ✅ Logout successful`);
    res.json({ 
      message: "Logged out successfully",
      requestId
    });
  });
});

export default router;