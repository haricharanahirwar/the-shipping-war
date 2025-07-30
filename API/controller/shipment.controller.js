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
