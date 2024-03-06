import express from "express";
const router = express.Router();
import {
  getProducts,
  getCustomers,
  getTransactions,
} from "../controllers/client.js";

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transaction", getTransactions);

export default router;
