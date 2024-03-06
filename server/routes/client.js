import express from "express";
const router = express.Router();
import { func } from "../controllers/client.js";

router.get("/products", func);

export default router;
