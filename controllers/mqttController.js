const mqttClient = require('../mqtt/mqttClient');
const MQTT_TOPIC = process.env.MQTT_TOPIC;

const publishMqttEvent = (req, res) => {
  const { event } = req.body;

  if (!event) {
    return res.status(400).json({ success: false, error: 'Missing event in request body' });
  }

  const payload = JSON.stringify({ event });

  mqttClient.publish(MQTT_TOPIC, payload, { qos: 1, retain: false }, (err) => {
    if (err) {
      console.error('[MQTT] Publish error:', err.message);
      return res.status(500).json({ success: false, error: 'Failed to publish' });
    }

    console.log(`[MQTT] Published: ${payload}`);
    return res.status(200).json({ success: true, message: 'Event published', event });
  });
};

module.exports = {
  publishMqttEvent,
};
