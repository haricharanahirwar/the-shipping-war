import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";

const BidSchema=mongoose.Schema({
    _id: Number,
  p_id:Number,
  bidprice:Number,
  u_id:String,
  info:String
})
//apply th e unique validetor pluging to bidschema
BidSchema.plugin(UniqueValidator);

//compile schema to model

const BidSchemaModel=mongoose.model("bid_collection",BidSchema);

export default BidSchemaModel;