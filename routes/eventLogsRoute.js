
const express = require("express");
const router = express.Router();
const eventLogsController = require("../controllers/eventLogsController");

router.post("/event-logs", eventLogsController.eventLogsController);

module.exports = router;
