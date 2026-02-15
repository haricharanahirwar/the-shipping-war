import "../models/connection.js";
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import SubCategorySchemaModel from "../models/subcategory.model.js";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Save subcategory with Cloudinary (Production ready)
export const save = async (req, res) => {
  try {
    const subcategory = await SubCategorySchemaModel.find().select('_id').sort({ _id: -1 }).limit(1);
    const _id = subcategory.length === 0 ? 1 : subcategory[0]._id + 1;

    const subcaticon = req.files.subcaticon;

    const result = await cloudinary.uploader.upload(subcaticon.tempFilePath, {
      folder: "subcategoryicons",
      public_id: `${Date.now()}-${subcaticon.name.split('.')[0]}`,
      resource_type: "auto",
      quality: "auto:low",
      fetch_format: "auto",
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto:low" }
      ]
    });

    const scDetails = {
      ...req.body,
      _id: _id,
      subcaticonnm: result.secure_url,
      cloudinary_id: result.public_id,
    };

    await SubCategorySchemaModel.create(scDetails);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Save failed:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Fetch subcategories
export const fetch = async (req, res) => {
  try {
    const scList = await SubCategorySchemaModel.find(req.query);
    if (scList.length !== 0)
      res.status(200).json(scList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete subcategory and Cloudinary image
export const deleteSubCategory = async (req, res) => {
  try {
    const { condition_obj } = req.body;
    if (!condition_obj)
      return res.status(400).json({ status: "Please enter valid condition" });

    const parsedCondition = JSON.parse(condition_obj);
    const scDetails = await SubCategorySchemaModel.findOne(parsedCondition);

    if (!scDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    // Delete Cloudinary image
    if (scDetails.cloudinary_id) {
      await cloudinary.uploader.destroy(scDetails.cloudinary_id);
    }

    await SubCategorySchemaModel.deleteOne(parsedCondition);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Delete failed:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update subcategory with optional image replacement
export const update = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;
    if (!condition_obj || !content_obj)
      return res.status(400).json({ status: "Please enter valid condition" });

    const parsedCondition = JSON.parse(condition_obj);
    const parsedContent = JSON.parse(content_obj);

    const scDetails = await SubCategorySchemaModel.findOne(parsedCondition);
    if (!scDetails)
      return res.status(404).json({ status: "Requested resource not available" });

    // If new file is uploaded, replace image in Cloudinary
    if (req.files?.subcaticon) {
      // Delete old image
      if (scDetails.cloudinary_id)
        await cloudinary.uploader.destroy(scDetails.cloudinary_id);

      const subcaticon = req.files.subcaticon;
      const result = await cloudinary.uploader.upload(subcaticon.tempFilePath, {
        folder: "subcategoryicons",
        public_id: `${Date.now()}-${subcaticon.name.split('.')[0]}`,
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto:low" }
        ]
      });

      parsedContent.subcaticonnm = result.secure_url;
      parsedContent.cloudinary_id = result.public_id;
    }

    await SubCategorySchemaModel.updateOne(parsedCondition, { $set: parsedContent });
    res.status(200).json({ msg: "OK" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
