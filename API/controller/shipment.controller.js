import "../models/connection.js";
import url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//import CategorySchemaModel from "../models/category.model.js";
import ShipmentSchemaModel from "../models/shipment.model.js";

export const save=async(req,res)=>{
 const shipment=await ShipmentSchemaModel.find();
 const l=shipment.length;
 const _id=l==0?1:shipment[l-1]._id+1;

 //to get file & to move in specific folder
 const picon=req.files.picon;
 const shipmenticonnm=Date.now()+"-"+picon.name;
 const uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/shipmenticons",shipmenticonnm);
 picon.mv(uploadpath);

  //to get file & to move in specific folder
 const description=req.files.description;
 const descriptionnm=Date.now()+"-"+description.name;
 const uploadpathDescription=path.join(__dirname,"../../UI/public/assets/uploads/Description",descriptionnm);
 picon.mv(uploadpathDescription);

 const sDetails={...req.body,'_id':_id,"piconnm":shipmenticonnm,"descriptionnm":descriptionnm,"auctionprice":req.body.baseprice,"info":Date()};
 try{
    await ShipmentSchemaModel.create(sDetails);
    res.status(201).json({"status":true});
 }
 catch(error){
    res.status(500).json({"status":false});
    console.log(error);
    
 }
};

export const fetch=async(req,res)=>{  
   var pList=await ShipmentSchemaModel.find(req.query);
   if(pList.length!=0) res.status(200).json(pList);
   else res.status(404).json({"status":"Resource not found"}); 
  };

  /*
 export var deleteCategory=async(req,res)=>{
   var obj=req.body;
   if(obj!=undefined)
   {
    var condition_obj=JSON.parse(req.body.condition_obj); 
    let cDetails = await CategorySchemaModel.findOne(condition_obj);
    if(cDetails){
       let category=await CategorySchemaModel.deleteOne(condition_obj);   
       if(category)
         res.status(200).json({"status":"OK"});
       else
         res.status(500).json({"status": "Server Error"});
      }
    else
     res.status(404).json({"status":"Requested resource not available"});
   } 
   else
    res.status(500).json({"status": "Please enter valid condition"});
   };


 export var update=async(req,res)=>{
      var obj=req.body;
      if(obj!=undefined)
      {
         let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
         if(cDetails){
             let category=await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set: JSON.parse(req.body.content_obj)});   
             if(category)
               res.status(200).json({"msg":"OK"});
             else
               res.status(500).json({"status": "Server Error"});
         }
         else
           res.status(404).json({"status":"Requested resource not available"});   
      }
      else
      res.status(500).json({"status": "Please enter valid condition"});      
   };
*/   
