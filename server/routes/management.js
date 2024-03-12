import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";
const router = express.Router();

router.get("/", getAdmins);
router.get("/Performance/:id", getUserPerformance);

export default router;
