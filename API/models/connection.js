// import mongoose from "mongoose";

// // Connect to the local MongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017/ShippingWar")
// .then(() => {
//     console.log("✅ MongoDB Connected Successfully to ShippingWar");
// })
// .catch((error) => {
//     console.log("❌ MongoDB Connection Error:", error);
// });
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));