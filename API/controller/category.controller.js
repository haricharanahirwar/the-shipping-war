import "../models/connection.js";
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import CategorySchemaModel from "../models/category.model.js";

dotenv.config();

// Setup Cloudinary from .env directly
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// SAVE CATEGORY
export const save = async (req, res) => {
  try {
    const category = await CategorySchemaModel.find();
    const l = category.length;
    const _id = l === 0 ? 1 : category[l - 1]._id + 1;

    // Cloudinary file upload
    const caticon = req.files.caticon;
    const uploadResult = await cloudinary.uploader.upload(caticon.tempFilePath, {
      folder: "categoryicons",
      public_id: `${Date.now()}-${caticon.name.split('.')[0]}`
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
    console.error("Cloudinary upload/save error:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// FETCH CATEGORY
export const fetch = async (req, res) => {
  try {
    var condition_obj = url.parse(req.url, true).query.condition_obj;
    condition_obj = condition_obj ? JSON.parse(condition_obj) : {};
    var cList = await CategorySchemaModel.find(condition_obj);
    if (cList.length !== 0)
      res.status(200).json(cList);
    else
      res.status(404).json({ "status": "Resource not found" });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ status: false });
  }
};

// DELETE CATEGORY
export var deleteCategory = async (req, res) => {
  try {
    var obj = req.body;
    if (obj) {
      var condition_obj = JSON.parse(req.body.condition_obj);
      let cDetails = await CategorySchemaModel.findOne(condition_obj);
      if (cDetails) {
        if (cDetails.caticon_cloudinary_id) {
          await cloudinary.uploader.destroy(cDetails.caticon_cloudinary_id);
        }
        let category = await CategorySchemaModel.deleteOne(condition_obj);
        if (category)
          res.status(200).json({ "status": "OK" });
        else
          res.status(500).json({ "status": "Server Error" });
      } else {
        res.status(404).json({ "status": "Requested resource not available" });
      }
    } else {
      res.status(500).json({ "status": "Please enter valid condition" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ status: false });
  }
};

// UPDATE CATEGORY
export var update = async (req, res) => {
  try {
    var obj = req.body;
    if (obj) {
      const condition_obj = JSON.parse(req.body.condition_obj);
      const content_obj = JSON.parse(req.body.content_obj);

      let cDetails = await CategorySchemaModel.findOne(condition_obj);
      if (cDetails) {
        // Optional: Replace image if new one uploaded
        if (req.files?.caticon) {
          if (cDetails.caticon_cloudinary_id)
            await cloudinary.uploader.destroy(cDetails.caticon_cloudinary_id);

          const newIcon = req.files.caticon;
          const uploadResult = await cloudinary.uploader.upload(newIcon.tempFilePath, {
            folder: "categoryicons",
            public_id: `${Date.now()}-${newIcon.name.split('.')[0]}`
          });

          content_obj.caticonnm = uploadResult.secure_url;
          content_obj.caticon_cloudinary_id = uploadResult.public_id;
        }

        let category = await CategorySchemaModel.updateOne(condition_obj, { $set: content_obj });
        if (category)
          res.status(200).json({ "msg": "OK" });
        else
          res.status(500).json({ "status": "Server Error" });
      } else {
        res.status(404).json({ "status": "Requested resource not available" });
      }
    } else {
      res.status(500).json({ "status": "Please enter valid condition" });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ status: false });
  }
};
