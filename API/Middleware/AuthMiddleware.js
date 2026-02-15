const { admin } = require('../firebase');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.authmiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Received token:", token ? "Token present" : "No token");
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log("Token verified, checking user");

      // Get user from MongoDB using email
      let user = await User.findOne({ email: decodedToken.email }).select('-password');

      // If user not found in MongoDB, create a minimal user record so profile endpoints work
      if (!user) {
        console.log("User not found in MongoDB, creating minimal user record for:", decodedToken.email);
        try {
          const randomPass = Math.random().toString(36).slice(-12) + Date.now().toString(36).slice(-4);
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(randomPass, saltRounds);

          // Use part of UID as a referral code to ensure uniqueness
          const referralCode = (decodedToken.uid || decodedToken.email || '').toString().slice(0, 8).toUpperCase();

         

          user = await newUser.save();
          console.log('Created new MongoDB user for Firebase UID:', decodedToken.uid);
        } catch (createErr) {
          console.error('Failed to create MongoDB user for decoded token:', createErr.message);
          return res.status(500).json({ message: 'Failed to create user' });
        }
      }

      // Add user to request object
      req.user = user;
      console.log("User authenticated:", user.email || decodedToken.email);
      next();
    } catch (verifyError) {
      console.error("Token verification failed:", verifyError.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};
  
