import "../models/connection.js";
import url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import SubCategorySchemaModel from "../models/subcategory.model.js";

export const save=async(req,res)=>{
 const subcategory=await SubCategorySchemaModel.find();
 const l=subcategory.length;
 const _id=l==0?1:subcategory[l-1]._id+1;

 //to get file & to move in specific folder
 const subcaticon=req.files.subcaticon;
 const subcaticonnm=Date.now()+"-"+subcaticon.name;
 const uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/subcategoryicons",subcaticonnm);
 subcaticon.mv(uploadpath);


 const scDetails={...req.body,'_id':_id,"subcaticonnm":subcaticonnm};
 try{
    await SubCategorySchemaModel.create(scDetails);
    res.status(201).json({"status":true});
 }
 catch(error){
    res.status(500).json({"status":false});
 }
};


export const fetch = async (req, res) => {
  var scList = await SubCategorySchemaModel.find(req.query);
  if (scList.length != 0)
    res.status(200).json(scList);
  else
    res.status(404).json({ "status": "Resource not found" });
};

// export var deleteCategory = async (req, res) => {
//   var obj = req.body;
//   if (obj != undefined) {
//     var condition_obj = JSON.parse(req.body.condition_obj);
//     let cDetails = await CategorySchemaModel.findOne(condition_obj);
//     if (cDetails) {
//       let category = await CategorySchemaModel.deleteOne(condition_obj);
//       if (category)
//         res.status(200).json({ "status": "OK" });
//       else
//         res.status(500).json({ "status": "Server Error" });
//     }
//     else
//       res.status(404).json({ "status": "Requested resource not available" });
//   }
//   else
//     res.status(500).json({ "status": "Please enter valid condition" });
// };


// export var update = async (req, res) => {
//   var obj = req.body;
//   if (obj != undefined) {
//     let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
//     if (cDetails) {
//       let category = await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj), { $set: JSON.parse(req.body.content_obj) });
//       if (category)
//         res.status(200).json({ "msg": "OK" });
//       else
//         res.status(500).json({ "status": "Server Error" });
//     }
//     else
//       res.status(404).json({ "status": "Requested resource not available" });
//   }
//   else
//     res.status(500).json({ "status": "Please enter valid condition" });
// };

