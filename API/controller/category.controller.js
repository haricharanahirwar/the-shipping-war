import "../models/connection.js";
import url from 'url';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import CategorySchemaModel from "../models/category.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create new category
export const save = async (req, res) => {
  try {
    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ status: false, error: "Category icon file is missing" });
    }

    const category = await CategorySchemaModel.find();
    const l = category.length;
    const _id = l === 0 ? 1 : category[l - 1]._id + 1;

    const caticon = req.files.caticon;
    const uploadResult = await cloudinary.uploader.upload(caticon.tempFilePath, {
      folder: "categoryicons",
      public_id: `${Date.now()}-${caticon.name.split('.')[0]}`,
    });

    const cDetails = {
      ...req.body,
      _id,
      caticonnm: uploadResult.secure_url,
      caticon_cloudinary_id: uploadResult.public_id
    };

    await CategorySchemaModel.create(cDetails);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Fetch categories
export const fetch = async (req, res) => {
  try {
    let condition_obj = url.parse(req.url, true).query.condition_obj;
    condition_obj = condition_obj ? JSON.parse(condition_obj) : {};
    const cList = await CategorySchemaModel.find(condition_obj);
    if (cList.length > 0)
      res.status(200).json(cList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { condition_obj } = req.body;
    if (!condition_obj)
      return res.status(400).json({ status: "Please enter valid condition" });

    const parsedCondition = JSON.parse(condition_obj);
    const category = await CategorySchemaModel.findOne(parsedCondition);
    if (!category)
      return res.status(404).json({ status: "Requested resource not available" });

    if (category.caticon_cloudinary_id)
      await cloudinary.uploader.destroy(category.caticon_cloudinary_id);

    await CategorySchemaModel.deleteOne(parsedCondition);
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update category
export const update = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;
    if (!condition_obj || !content_obj)
      return res.status(400).json({ status: "Invalid request data" });

    const parsedCondition = JSON.parse(condition_obj);
    const parsedContent = JSON.parse(content_obj);
    const category = await CategorySchemaModel.findOne(parsedCondition);

    if (!category)
      return res.status(404).json({ status: "Requested resource not available" });

    // Optional: update icon
    if (req.files?.caticon) {
      if (category.caticon_cloudinary_id)
        await cloudinary.uploader.destroy(category.caticon_cloudinary_id);

      const newIcon = req.files.caticon;
      const uploadResult = await cloudinary.uploader.upload(newIcon.tempFilePath, {
        folder: "categoryicons",
        public_id: `${Date.now()}-${newIcon.name.split('.')[0]}`,
      });

      parsedContent.caticonnm = uploadResult.secure_url;
      parsedContent.caticon_cloudinary_id = uploadResult.public_id;
    }

    await CategorySchemaModel.updateOne(parsedCondition, { $set: parsedContent });
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
