import mongoose from "mongoose";

const ShipmentSchema = mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    trim: true,
  },
  catnm: {
    type: String,
    trim: true,
  },
  subcatnm: {
    type: String,
    trim: true,
  },
  baseprice: {
    type: Number,
    trim: true,
  },
  auctionprice: {
    type: Number,
    trim: true,
  },
  piconnm: {
    type: String,
    trim: true,
  },
  useremail: {
    type: String,
    trim: true,
  },
  info: String,
  status: {
    type: String,
    enum: ['active', 'expired', 'confirmed', 'completed'],
    default: 'active'
  },
  winner_email: {
    type: String,
    default: null
  },
  winning_bid: {
    type: Number,
    default: null
  },
  confirmed_at: {
    type: Date,
    default: null
  }
});

const ShipmentSchemaModel = mongoose.model("shipment_collection", ShipmentSchema);

export default ShipmentSchemaModel;
