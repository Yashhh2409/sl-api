const mqttClient = require('../mqtt/mqttClient');
const MQTT_TOPIC = process.env.MQTT_TOPIC;

const publishMqttEvent = (req, res) => {
  const { event, iccid } = req.body;

  console.log('[EVENT RECEIVED]', req.body);

  if (!event || !iccid) {
    return res.status(400).json({ success: false, error: 'Missing event or iccid in request body' });
  }

  const payload = JSON.stringify({ event, iccid });

  // Ensure MQTT is connected
  if (!mqttClient.connected) {
    console.error('[MQTT] Client not connected');
    return res.status(503).json({ success: false, error: 'MQTT client not connected' });
  }

  mqttClient.publish(MQTT_TOPIC, payload, { qos: 1, retain: false }, (err) => {
    if (err) {
      console.error('[MQTT] Publish error:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to publish' });
    }

    console.log(`[MQTT] Published: ${payload}`);
    return res.status(200).json({ event, iccid });
  });
};

module.exports = {
  publishMqttEvent,
};
