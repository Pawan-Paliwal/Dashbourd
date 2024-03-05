import express from "express";
const router = express.Router();
import { getProducts } from "../controllers/client.js";

router.get("/products", getProducts);

export default router;
