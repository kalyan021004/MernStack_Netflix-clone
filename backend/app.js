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
  "https://mernstack-netflix-clone-1.onrender.com"
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

// ========== ADD DEBUG MIDDLEWARE HERE ==========

// 1. Request logging middleware (add after passport setup)
app.use((req, res, next) => {
  if (req.path.includes('/api/')) {
    console.log(`📡 API Request: ${req.method} ${req.path}`, {
      origin: req.get('origin'),
      contentType: req.get('content-type'),
      timestamp: new Date().toISOString(),
      userAgent: req.get('user-agent'),
      ip: req.ip
    });
  }
  next();
});

// 2. CORS debugging middleware
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log('🔄 CORS Preflight:', {
      origin: req.get('origin'),
      method: req.get('access-control-request-method'),
      headers: req.get('access-control-request-headers')
    });
  }
  next();
});

// 3. Environment debug endpoint
app.use('/debug/env', (req, res) => {
  const envInfo = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI ? 'SET' : 'MISSING',
    SESSION_SECRET: process.env.SESSION_SECRET ? 'SET' : 'MISSING',
    timestamp: new Date().toISOString(),
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
    allowedOrigins: allowedOrigins,
    headers: {
      host: req.get('host'),
      origin: req.get('origin'),
      referer: req.get('referer'),
      userAgent: req.get('user-agent')
    }
  };
  
  res.json(envInfo);
});

// ========== END DEBUG MIDDLEWARE ==========

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/titles", titleRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("🌐 Backend Root Route Working!");
});

app.get("/health", async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      envVars: {
        SESSION_SECRET: !!process.env.SESSION_SECRET,
        MONGO_URI: !!process.env.MONGO_URI,
      }
    }
  };

  try {
    res.json(health);
  } catch (error) {
    health.status = 'error';
    health.error = error.message;
    res.status(500).json(health);
  }
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

// ========== ADD ERROR HANDLING HERE ==========

// Enhanced error handling middleware (add at the very end, before server start)
app.use((error, req, res, next) => {
  console.error('🔥 Application Error:', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    headers: req.headers,
    body: req.body
  });
  
  res.status(500).json({
    error: 'Internal Server Error',
    timestamp: new Date().toISOString(),
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("🔍 Environment check:", {
      NODE_ENV: process.env.NODE_ENV,
      PORT: PORT,
      MONGO_URI: process.env.MONGO_URI ? 'SET' : 'MISSING',
      SESSION_SECRET: process.env.SESSION_SECRET ? 'SET' : 'MISSING',
      allowedOrigins: allowedOrigins
    });
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`🔍 Debug info: http://localhost:${PORT}/debug/env`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });