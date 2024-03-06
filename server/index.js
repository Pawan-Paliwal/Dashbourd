import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

///////////////////////
///DATA IMPORT
import User from "./model/User.js";
import Product from "./model/Product.js";
import ProductStat from "./model/ProductStat.js";
import { dataUser } from "./data/user.js";
import { DataProduct } from "./data/index.js";
import { dataProductStat } from "./data/dataProductStat.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//////////////////////////////////////////////////////////////////////////////
// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/////////////////////////////////////////
// MONGOOSE SETUP
const PORT = 5001 || 9000;
mongoose
  .connect(
    "mongodb+srv://21114843:XO9WNWKNsEHVeV0V@cluster0.isdo082.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`server listen on :${PORT}`));
    // Product.insertMany(DataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((error) => {
    console.log(error);
  });
