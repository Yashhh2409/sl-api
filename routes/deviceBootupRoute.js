const express = require("express");
const router = express.Router();
const { handleBootup } = require("../controllers/deviceBootupController");

router.post("/device/bootup", handleBootup);

module.exports = router;
