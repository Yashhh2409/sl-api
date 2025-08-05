const express = require("express");
const router = express.Router();
const RecentImageController = require('../controllers/RecentImageController')

router.get("/recent-image", RecentImageController.getRecentImageByICCID);

module.exports = router;
