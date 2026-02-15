import "../models/connection.js";
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import ShipmentSchemaModel from "../models/shipment.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Save shipment with Cloudinary upload
export const save = async (req, res) => {
  try {
    const shipment = await ShipmentSchemaModel.find();
    const l = shipment.length;
    const _id = l === 0 ? 1 : shipment[l - 1]._id + 1;

    const picon = req.files.picon;
    const piconResult = await cloudinary.uploader.upload(picon.tempFilePath, {
      folder: "shipmenticons",
      public_id: `${Date.now()}-${picon.name.split('.')[0]}`,
    });

    // const description = req.files.description;
    // const descResult = await cloudinary.uploader.upload(description.tempFilePath, {
    //   folder: "shipmentdescriptions",
    //   resource_type: "raw", // for non-images like PDFs
    //   public_id: `${Date.now()}-${description.name.split('.')[0]}`,
    // });

    const sDetails = {
      ...req.body,
      _id,
      piconnm: piconResult.secure_url,
      picon_cloudinary_id: piconResult.public_id,
      // descriptionnm: descResult.secure_url,
      // description_cloudinary_id: descResult.public_id,
      auctionprice: req.body.baseprice,
      info: new Date()
    };
    console.log(sDetails)
    await ShipmentSchemaModel.create(sDetails);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Fetch shipments
export const fetch = async (req, res) => {
  try {
    const pList = await ShipmentSchemaModel.find(req.query);
    if (pList.length !== 0)
      res.status(200).json(pList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete shipment + Cloudinary files
export const deleteShipment = async (req, res) => {
  try {
    const { condition_obj } = req.body;
    if (!condition_obj)
      return res.status(400).json({ status: "Please enter valid condition" });

    const parsedCondition = JSON.parse(condition_obj);
    const sDetails = await ShipmentSchemaModel.findOne(parsedCondition);

    if (!sDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    // Delete files from Cloudinary
    if (sDetails.picon_cloudinary_id)
      await cloudinary.uploader.destroy(sDetails.picon_cloudinary_id);

    if (sDetails.description_cloudinary_id)
      await cloudinary.uploader.destroy(sDetails.description_cloudinary_id, { resource_type: "raw" });

    await ShipmentSchemaModel.deleteOne(parsedCondition);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update shipment with optional file replacement
export const updateShipment = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;
    if (!condition_obj || !content_obj)
      return res.status(400).json({ status: "Please enter valid condition" });

    const parsedCondition = JSON.parse(condition_obj);
    const parsedContent = JSON.parse(content_obj);

    const sDetails = await ShipmentSchemaModel.findOne(parsedCondition);
    if (!sDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    // Replace picon if uploaded
    if (req.files?.picon) {
      if (sDetails.picon_cloudinary_id)
        await cloudinary.uploader.destroy(sDetails.picon_cloudinary_id);

      const newPicon = req.files.picon;
      const piconResult = await cloudinary.uploader.upload(newPicon.tempFilePath, {
        folder: "shipmenticons",
        public_id: `${Date.now()}-${newPicon.name.split('.')[0]}`,
      });

      parsedContent.piconnm = piconResult.secure_url;
      parsedContent.picon_cloudinary_id = piconResult.public_id;
    }

    // Replace description if uploaded
    if (req.files?.description) {
      if (sDetails.description_cloudinary_id)
        await cloudinary.uploader.destroy(sDetails.description_cloudinary_id, { resource_type: "raw" });

      const newDesc = req.files.description;
      const descResult = await cloudinary.uploader.upload(newDesc.tempFilePath, {
        folder: "shipmentdescriptions",
        resource_type: "raw",
        public_id: `${Date.now()}-${newDesc.name.split('.')[0]}`,
      });

      parsedContent.descriptionnm = descResult.secure_url;
      parsedContent.description_cloudinary_id = descResult.public_id;
    }

    await ShipmentSchemaModel.updateOne(parsedCondition, { $set: parsedContent });
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Confirm order - Select winner and mark as confirmed
export const confirmOrder = async (req, res) => {
  try {
    const { shipment_id } = req.body;
    
    if (!shipment_id) {
      return res.status(400).json({ status: false, message: "Shipment ID required" });
    }

    // Get shipment details
    const shipment = await ShipmentSchemaModel.findOne({ _id: shipment_id });
    
    if (!shipment) {
      return res.status(404).json({ status: false, message: "Shipment not found" });
    }

    // Check if already confirmed
    if (shipment.status === 'confirmed' || shipment.status === 'completed') {
      return res.status(400).json({ 
        status: false, 
        message: "Order already confirmed",
        winner: shipment.winner_email
      });
    }

    // Import bid model dynamically
    const BidSchemaModel = (await import('../models/bid.model.js')).default;
    
    // Get all bids for this shipment
    const bids = await BidSchemaModel.find({ p_id: shipment_id.toString() }).sort({ bidprice: 1 });
    
    if (bids.length === 0) {
      return res.status(400).json({ 
        status: false, 
        message: "No bids found for this shipment" 
      });
    }

    // Winner is the one with minimum bid (reverse auction)
    const winner = bids[0];

    // Update shipment with winner details
    await ShipmentSchemaModel.updateOne(
      { _id: shipment_id },
      {
        $set: {
          status: 'confirmed',
          winner_email: winner.u_id,
          winning_bid: winner.bidprice,
          confirmed_at: new Date()
        }
      }
    );

    res.status(200).json({
      status: true,
      message: "Order confirmed successfully",
      winner: {
        email: winner.u_id,
        bid_price: winner.bidprice,
        total_bids: bids.length
      }
    });

  } catch (error) {
    console.error("Confirm order error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get winner details for a shipment
export const getWinner = async (req, res) => {
  try {
    const { shipment_id } = req.query;
    
    if (!shipment_id) {
      return res.status(400).json({ status: false, message: "Shipment ID required" });
    }

    const shipment = await ShipmentSchemaModel.findOne({ _id: shipment_id });
    
    if (!shipment) {
      return res.status(404).json({ status: false, message: "Shipment not found" });
    }

    if (shipment.status !== 'confirmed' && shipment.status !== 'completed') {
      return res.status(400).json({ 
        status: false, 
        message: "Order not yet confirmed" 
      });
    }

    res.status(200).json({
      status: true,
      winner: {
        email: shipment.winner_email,
        winning_bid: shipment.winning_bid,
        confirmed_at: shipment.confirmed_at,
        shipment_status: shipment.status
      }
    });

  } catch (error) {
    console.error("Get winner error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Mark order as completed
export const completeOrder = async (req, res) => {
  try {
    const { shipment_id } = req.body;
    
    if (!shipment_id) {
      return res.status(400).json({ status: false, message: "Shipment ID required" });
    }

    const shipment = await ShipmentSchemaModel.findOne({ _id: shipment_id });
    
    if (!shipment) {
      return res.status(404).json({ status: false, message: "Shipment not found" });
    }

    if (shipment.status !== 'confirmed') {
      return res.status(400).json({ 
        status: false, 
        message: "Order must be confirmed before completion" 
      });
    }

    await ShipmentSchemaModel.updateOne(
      { _id: shipment_id },
      { $set: { status: 'completed' } }
    );

    res.status(200).json({
      status: true,
      message: "Order marked as completed"
    });

  } catch (error) {
    console.error("Complete order error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
