import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

// Import middleware
import { authenticate, authenticateOptional } from './Middleware/authenticate.middleware.js';
import { authorize, checkPermission } from './Middleware/authorize.middleware.js';
import { sanitizeInputs } from './Middleware/validate.middleware.js';
import { errorHandler, notFoundHandler, asyncHandler } from './Middleware/errorHandler.middleware.js';
import { requestLogger, auditLogger, performanceMonitor, securityHeaders, simpleRateLimit } from './Middleware/logger.middleware.js';

// Import routers
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ShipmentRouter from './routes/shipment.router.js';
import BidRouter from './routes/bid.router.js';

// Load environment variables
dotenv.config();

const app = express();

// ============================================
// GLOBAL MIDDLEWARE SETUP
// ============================================

// 1. Security Headers Middleware
app.use(securityHeaders());

// 2. Request Logging Middleware
app.use(requestLogger());
app.use(performanceMonitor());

// 3. Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. File Upload Configuration
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// 5. CORS Configuration
app.use(
  cors({
    origin: "https://the-shipping-war-oiw4.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 6. Input Sanitization Middleware
app.use(sanitizeInputs());

// 7. Simple Rate Limiting (Optional - use for development)
app.use(simpleRateLimit(100, 60000)); // 100 requests per minute

// 8. Audit Logger Middleware
app.use(auditLogger());

// ============================================
// ROUTE DEFINITIONS
// ============================================

// Health Check Route (Public)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Public Routes (No authentication required)
app.use("/user", UserRouter); // Login/Register routes are in user router

// Protected Routes (Require authentication)
app.use("/category", authenticateOptional, CategoryRouter); // Categories can be public to view
app.use("/subcategory", authenticateOptional, SubCategoryRouter); // Subcategories can be public
app.use("/shipment", authenticateOptional, ShipmentRouter); // Shipments can be viewed publicly, but save requires auth
app.use("/bid", authenticate, BidRouter); // Bids require auth

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 Not Found Handler
app.use(notFoundHandler);

// Global Error Handler (Must be last)
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[INFO] Server running on port ${PORT}`);
  console.log(`[INFO] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[INFO] Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});