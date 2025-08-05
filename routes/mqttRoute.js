// routes/mqtt.routes.js
const express = require('express');
const router = express.Router();
const { publishMqttEvent } = require('../controllers/mqttController');

// POST /api/mqtt/publish
router.post('/event-logs', publishMqttEvent);

module.exports = router;
