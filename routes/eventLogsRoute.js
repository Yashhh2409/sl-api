
const express = require("express");
const router = express.Router();
const { eventLogs } = require("../controllers/eventLogsController");
router.post("/event-logs", eventLogs);

module.exports = router;
