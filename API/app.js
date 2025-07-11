import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

//to link router
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ShipmentRouter from './routes/shipment.router.js';
import BidRouter from './routes/bid.router.js';


//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(fileUpload());

//configuration to resolve cross origin problem
app.use(cors({
  origin: 'https://the-shipping-war-oiw4.vercel.app',
  Credential:true,
  methods:["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders:["content-type","Authorization"]
}));


//router level middleware to link routers
app.use("/user",UserRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/shipment",ShipmentRouter);
app.use("/bid",BidRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server invoked at port ${PORT}`);
});

