const mqtt = require('mqtt');
require('dotenv').config();

const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, {
  clientId: 'client-' + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 1000,
  connectTimeout: 10 * 1000,
  clean: true,
});

client.on('connect', () => {
  console.log('[MQTT] Connected to broker');
});

client.on('error', (err) => {
  console.error('[MQTT] Connection error:', err.message);
});

client.on('reconnect', () => {
  console.log('[MQTT] Reconnecting...');
});

module.exports = client;
