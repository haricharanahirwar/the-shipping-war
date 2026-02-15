import "../models/connection.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
import sendMail from "./email.controller.js";
import passwordGenerate from 'generate-password';

import UserSchemaModel from "../models/user.model.js";

export const save =async(req,res)=>{
 const users = await UserSchemaModel.find().select('_id').sort({ _id: -1 }).limit(1);
 const _id = users.length === 0 ? 1 : users[0]._id + 1;
 const password=passwordGenerate.generate({
  length:8,
  numbers:true,
  symbols:true,
  strict:true,
  lowercase:true
 });
 const userDetails={...req.body,'_id':_id,password:password,'status':1,role:'user',info:Date()};
 console.log(userDetails);
 try{
    await UserSchemaModel.create(userDetails);
    // Send email asynchronously without waiting
    sendMail(userDetails.email,userDetails.password).catch(err => 
      console.error('Email send failed:', err)
    );
    res.status(201).json({"status":true});
 }
 catch(error){
    res.status(500).json({"status":false});
    console.log(error)
 }
};

export const fetch=async(req,res)=>{
   var userList=await UserSchemaModel.find(req.query);
   if(userList.length!=0) res.status(200).json(userList);
   else res.status(404).json({"status":"Resource not found"}); 
  };

  // Get current user's profile (for authenticated users)
  export const getProfile = async(req, res) => {
    try {
      const user = await UserSchemaModel.findOne({ 
        email: req.user.email 
      }).select('-password');
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ status: "User not found" });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ status: "Server Error" });
    }
  };

  export var deleteUser=async(req,res)=>{
   try {
     var obj=req.body;
     console.log('Delete request body:', JSON.stringify(obj));
     
     if(obj!=undefined)
     {
      // Handle both JSON string and object formats
      let condition_obj = obj.condition_obj || obj;
      
      // Only parse if it's a valid JSON string
      if (typeof condition_obj === 'string') {
        // Check if string starts with { and ends with }
        if (condition_obj.trim().startsWith('{') && condition_obj.trim().endsWith('}')) {
          try {
            condition_obj = JSON.parse(condition_obj);
          } catch(e) {
            // If JSON.parse fails, try to fix common issues
            console.error('JSON parse error, attempting to fix:', e);
            // Fix: add quotes to keys and values
            let fixed = condition_obj
              .replace(/\{/g, '{"')
              .replace(/\}/g, '"}')
              .replace(/:/g, '":"')
              .replace(/,/g, '","')
              .replace(/""/g, '"');
            
            try {
              condition_obj = JSON.parse(fixed);
            } catch(e2) {
              console.error('Failed to fix JSON:', e2);
              return res.status(400).json({"status": "Invalid JSON format"});
            }
          }
        }
      }
      
      console.log('Parsed condition:', condition_obj);
      
      let userDetails = await UserSchemaModel.findOne(condition_obj);
      if(userDetails){
         let user=await UserSchemaModel.deleteOne(condition_obj);   
         if(user)
           res.status(200).json({"status":"OK"});
         else
           res.status(500).json({"status": "Server Error"});
        }
      else
       res.status(404).json({"status":"Requested resource not available"});
     } 
     else
      res.status(500).json({"status": "Please enter valid condition"});
   } catch(error) {
     console.error('Delete user error:', error);
     res.status(500).json({"status": "Server Error", "error": error.message});
   }
   };


   export var update=async(req,res)=>{
      try {
        var obj=req.body;
        console.log('Update request body:', JSON.stringify(obj));
        
        if(obj!=undefined)
        {
           // Handle both JSON string and object formats
           let condition_obj = req.body.condition_obj;
           let content_obj = req.body.content_obj;
           
           // Only parse if they are valid JSON strings
           if (typeof condition_obj === 'string') {
             if (condition_obj.trim().startsWith('{') && condition_obj.trim().endsWith('}')) {
               try {
                 condition_obj = JSON.parse(condition_obj);
               } catch(e) {
                 console.error('Condition JSON parse error, attempting to fix:', e);
                 let fixed = condition_obj
                   .replace(/\{/g, '{"')
                   .replace(/\}/g, '"}')
                   .replace(/:/g, '":"')
                   .replace(/,/g, '","')
                   .replace(/""/g, '"');
                 
                 try {
                   condition_obj = JSON.parse(fixed);
                 } catch(e2) {
                   console.error('Failed to fix condition JSON:', e2);
                   return res.status(400).json({"status": "Invalid condition JSON format"});
                 }
               }
             }
           }
           
           if (typeof content_obj === 'string') {
             if (content_obj.trim().startsWith('{') && content_obj.trim().endsWith('}')) {
               try {
                 content_obj = JSON.parse(content_obj);
               } catch(e) {
                 console.error('Content JSON parse error, attempting to fix:', e);
                 let fixed = content_obj
                   .replace(/\{/g, '{"')
                   .replace(/\}/g, '"}')
                   .replace(/:/g, '":"')
                   .replace(/,/g, '","')
                   .replace(/""/g, '"');
                 
                 try {
                   content_obj = JSON.parse(fixed);
                 } catch(e2) {
                   console.error('Failed to fix content JSON:', e2);
                   return res.status(400).json({"status": "Invalid content JSON format"});
                 }
               }
             }
           }
           
           // Convert status string to number if present
           if (content_obj.status !== undefined) {
             content_obj.status = parseInt(content_obj.status);
           }
           
           console.log('Parsed condition:', condition_obj);
           console.log('Parsed content:', content_obj);
           
           let userDetails = await UserSchemaModel.findOne(condition_obj);
           if(userDetails){
               let user=await UserSchemaModel.updateOne(condition_obj,{$set:content_obj});   
               if(user)
                 res.status(200).json({"msg":"OK"});
               else
                 res.status(500).json({"status": "Server Error"});
           }
           else
             res.status(404).json({"status":"Requested resource not available"});   
        }
        else
        res.status(500).json({"status": "Please enter valid condition"});
      } catch(error) {
        console.error('Update user error:', error);
        res.status(500).json({"status": "Server Error", "error": error.message});
      }      
   };

   // Update current user's profile (for authenticated users)
   export const updateProfile = async(req, res) => {
     try {
       const { name, mobile, address, city, gender } = req.body;
       
       const user = await UserSchemaModel.findOneAndUpdate(
         { email: req.user.email },
         { $set: { name, mobile, address, city, gender } },
         { new: true }
       ).select('-password');
       
       if (user) {
         res.status(200).json({ msg: "OK", user });
       } else {
         res.status(404).json({ status: "User not found" });
       }
     } catch (error) {
       console.error('Error updating profile:', error);
       res.status(500).json({ status: "Server Error" });
     }
   };

   // Change password for current user
   export const changePassword = async(req, res) => {
     try {
       const { oldPassword, newPassword } = req.body;
       
       // Find user and verify old password
       const user = await UserSchemaModel.findOne({ 
         email: req.user.email,
         password: oldPassword 
       });
       
       if (!user) {
         return res.status(401).json({ 
           status: false, 
           message: "Invalid old password" 
         });
       }
       
       // Update password
       await UserSchemaModel.updateOne(
         { email: req.user.email },
         { $set: { password: newPassword } }
       );
       
       res.status(200).json({ 
         status: true, 
         message: "Password changed successfully" 
       });
       
     } catch (error) {
       console.error('Error changing password:', error);
       res.status(500).json({ status: false, message: "Server Error" });
     }
   };
   
   
  //  export const login=async(req,res)=>{
  //   var condition_obj={...req.body,"status":1};
  //   var userList=await UserSchemaModel.find(condition_obj);
  //   if(userList.length!=0)
  //   {
  //     const payload=userList[0].email; 
  //     const key=rs.generate(50);
  //     const token = jwt.sign(payload,key); 
  //     res.status(200).json({"token":token,"userDetails":userList[0]});
  //   }
  //   else
  //     res.status(500).json({"token":"error"});  
  // };
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchemaModel.findOne({
      email: email.toLowerCase(),
      status: 1
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // JWT token with email, id, and role for middleware authentication
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: `Welcome ${user.role}`,
      token,
      userDetails: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        gender: user.gender,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};



