import '../models/connection.js';
import rs from 'randomstring';
import url from 'url';
import path from 'path';

import BidSchemaModel from '../models/bid.model.js';

// Controller to save bid
export var save = async (req, res) => {
  try {
    const bidList = await BidSchemaModel.find().sort({ _id: 1 });
    const l = bidList.length;
    const _id = l === 0 ? 1 : bidList[l - 1]._id + 1;

    const bidDetails = {
      ...req.body,
      _id: _id,
      info: new Date().toString()
    };

    await BidSchemaModel.create(bidDetails);
    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Error in save:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};

// Controller to fetch bids
export var fetch = async (req, res) => {
  try {
    const condition_obj = url.parse(req.url, true).query;

    const bidList = await BidSchemaModel.find(condition_obj);
    if (bidList.length !== 0)
      res.status(200).json(bidList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    console.error("Error in fetch:", error);
    res.status(500).json({ status: false, error: error.message });
  }
};
