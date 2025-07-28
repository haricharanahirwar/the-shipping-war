import "../models/connection.js";
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import CategorySchemaModel from "../models/category.model.js";

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Save category with Cloudinary image upload
export const save = async (req, res) => {
  try {
    const category = await CategorySchemaModel.find();
    const l = category.length;
    const _id = l === 0 ? 1 : category[l - 1]._id + 1;

    const caticon = req.files.caticon;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(caticon.tempFilePath, {
      folder: "categoryicons",
      public_id: Date.now() + "-" + caticon.name.split('.')[0],
    });

    const cDetails = {
      ...req.body,
      _id: _id,
      caticonnm: result.secure_url, // Use Cloudinary image URL
    };

    await CategorySchemaModel.create(cDetails);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Cloudinary upload or DB insert failed:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Fetch categories
export const fetch = async (req, res) => {
  try {
    let condition_obj = url.parse(req.url, true).query.condition_obj;
    condition_obj = condition_obj ? JSON.parse(condition_obj) : {};

    const cList = await CategorySchemaModel.find(condition_obj);
    if (cList.length !== 0)
      res.status(200).json(cList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete category (Cloudinary cleanup optional)
export const deleteCategory = async (req, res) => {
  try {
    const obj = req.body;
    if (!obj || !req.body.condition_obj) {
      return res.status(400).json({ status: "Please enter valid condition" });
    }

    const condition_obj = JSON.parse(req.body.condition_obj);
    const cDetails = await CategorySchemaModel.findOne(condition_obj);

    if (!cDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    await CategorySchemaModel.deleteOne(condition_obj);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update category
export const update = async (req, res) => {
  try {
    if (!req.body || !req.body.condition_obj || !req.body.content_obj) {
      return res.status(400).json({ status: "Please enter valid condition" });
    }

    const condition_obj = JSON.parse(req.body.condition_obj);
    const content_obj = JSON.parse(req.body.content_obj);

    const cDetails = await CategorySchemaModel.findOne(condition_obj);

    if (!cDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    await CategorySchemaModel.updateOne(condition_obj, { $set: content_obj });
    res.status(200).json({ msg: "OK" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
