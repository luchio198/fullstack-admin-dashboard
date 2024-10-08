import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

/* data imports*/
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from './data/index.js';

/* CONIFGURATION */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Connected to Server Port: ${PORT}`));

    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const productStatCount = await ProductStat.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const OverallStatCount = await OverallStat.countDocuments();
    const AffiliateStatCount = await AffiliateStat.countDocuments();

    if (userCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      User.insertMany(dataUser);
    }
    if (productCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      Product.insertMany(dataProduct);
    }
    if (productStatCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      ProductStat.insertMany(dataProductStat);
    }
    if (transactionCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      Transaction.insertMany(dataTransaction);
    }
    if (OverallStatCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      OverallStat.insertMany(dataOverallStat);
    }
    if (AffiliateStatCount === 0) {
      /* ONLY ADD DATA ONE TIME */
      AffiliateStat.insertMany(dataAffiliateStat);
    }
  })
  .catch((error) => console.log(`${error} did not connect`));
