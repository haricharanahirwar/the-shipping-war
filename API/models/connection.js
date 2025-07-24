// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Load environment variables from .env
// dotenv.config();

// const uri = process.env.MONGO_URI;

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(" Successfully connected to MongoDB"))
//   .catch((err) => console.error(" MongoDB connection error:", err));
import mongoose from 'mongoose';
const url="mongodb://127.0.0.1:27017/shippingwar-copy";
mongoose.connect(url);
console.log("Successfully connected to mongodb database...");