// mqtt/mqttClient.js
const mqtt = require('mqtt');
require('dotenv').config();

const {
  MQTT_HOST,
  MQTT_PORT,
} = process.env;

const clientId = 'web-client-' + Math.random().toString(16).slice(2);
const mqttUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`;

const mqttClient = mqtt.connect(mqttUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 2000,
});

mqttClient.on('connect', () => {
  console.log('[MQTT] Connected');
});

mqttClient.on('error', (err) => {
  console.error('[MQTT] Error:', err.message);
});

module.exports = mqttClient;
