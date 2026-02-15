import mongoose from "mongoose";

// Connect to the local MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/ShippingWar")
.then(() => {
    console.log("✅ MongoDB Connected Successfully to ShippingWar");
})
.catch((error) => {
    console.log("❌ MongoDB Connection Error:", error);
});
