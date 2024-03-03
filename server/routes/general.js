const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Your route handling logic here
  res.send("Client route");
});

module.exports = router;
