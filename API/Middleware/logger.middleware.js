/**
 * Logging Middleware
 * Tracks all incoming requests with detailed information
 */

import { USER_ROLES } from '../constants/roles.constants.js';

/**
 * Request logger middleware
 * Logs all incoming requests with method, path, status, and authentication info
 * @returns {Function} Middleware function
 */
export const requestLogger = () => {
  return (req, res, next) => {
    const startTime = Date.now();

    // Capture original res.json to log response status
    const originalJson = res.json.bind(res);

    res.json = function (data) {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;
      const userEmail = req.user ? req.user.email : 'unauthenticated';
      const userRole = req.user ? req.user.role : 'none';

      // Color coding for status codes
      let statusColor = '';
      if (statusCode >= 200 && statusCode < 300) statusColor = '✓'; // Success
      else if (statusCode >= 300 && statusCode < 400) statusColor = '→'; // Redirect
      else if (statusCode >= 400 && statusCode < 500) statusColor = '!'; // Client Error
      else statusColor = '✗'; // Server Error

      const logMessage = `${statusColor} [${statusCode}] ${req.method} ${req.originalUrl} - ${duration}ms - ${userEmail} (${userRole})`;

      // Log to appropriate level
      if (statusCode >= 400) {
        console.error(`[${new Date().toISOString()}] ${logMessage}`);
      } else {
        console.log(`[${new Date().toISOString()}] ${logMessage}`);
      }

      return originalJson(data);
    };

    next();
  };
};

/**
 * Audit logger middleware
 * Logs all CREATE, UPDATE, DELETE operations for audit trail
 * @returns {Function} Middleware function
 */
export const auditLogger = () => {
  return (req, res, next) => {
    const auditableMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

    if (auditableMethods.includes(req.method) && req.user) {
      const auditLog = {
        timestamp: new Date().toISOString(),
        action: req.method,
        user: req.user.email,
        role: req.user.role,
        endpoint: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        body: sanitizeForLogging(req.body)
      };

      console.log('[AUDIT]', JSON.stringify(auditLog));

      // Optional: Save to database for audit trail
      // await AuditLog.create(auditLog);
    }

    next();
  };
};

/**
 * Performance monitoring middleware
 * Tracks response times and identifies slow endpoints
 * @returns {Function} Middleware function
 */
export const performanceMonitor = () => {
  return (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      // Log slow requests (> 1 second)
      if (duration > 1000) {
        console.warn(`[PERFORMANCE] Slow request detected: ${req.method} ${req.originalUrl} took ${duration}ms`);
      }
    });

    next();
  };
};

/**
 * Security headers middleware
 * Adds security headers to all responses
 * @returns {Function} Middleware function
 */
export const securityHeaders = () => {
  return (req, res, next) => {
    // Prevent XSS attacks
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Prevent MIME type sniffing
    res.setHeader('Content-Security-Policy', "default-src 'self'");

    // Remove powered by header
    res.removeHeader('X-Powered-By');

    next();
  };
};

/**
 * Rate limiting helper
 * Simple in-memory rate limiter for development
 * For production, use 'express-rate-limit' package
 */
const requestCounts = new Map();

export const simpleRateLimit = (maxRequests = 100, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts.has(ip)) {
      requestCounts.set(ip, []);
    }

    const timestamps = requestCounts.get(ip);
    const recentRequests = timestamps.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      console.warn(`[RATE LIMIT] IP ${ip} exceeded rate limit`);
      return res.status(429).json({
        status: false,
        message: 'Too many requests, please try again later'
      });
    }

    recentRequests.push(now);
    requestCounts.set(ip, recentRequests);

    next();
  };
};

/**
 * Sanitize sensitive data from logging
 * @param {Object} data - Data to sanitize
 * @returns {Object} Sanitized data
 */
function sanitizeForLogging(data) {
  if (!data || typeof data !== 'object') return data;

  const sensitiveFields = ['password', 'token', 'authorization', 'creditCard'];
  const sanitized = { ...data };

  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  });

  return sanitized;
}

export default requestLogger;
