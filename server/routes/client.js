import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
  // Your route handling logic here
  res.send("Client route");
});

export default router;
