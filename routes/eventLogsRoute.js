const express = require("express");

const router = express.Router();
const eventLogsController = require("../controllers/eventLogsController");

router.get("/event-logs", eventLogsController);

module.exports;
