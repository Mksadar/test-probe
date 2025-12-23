const express = require('express');
const app = express();

// Flags used by Kubernetes probes
let isHealthy = true;   // Liveness
let isReady = true;     // Readiness

// --------------------
// LIVENESS PROBE
// --------------------
app.get('/healthz', (req, res) => {
  if (isHealthy) {
    return res.status(200).send('OK');
  }
  res.status(500).send('Not Healthy');
});

// --------------------
// READINESS PROBE
// --------------------
app.get('/ready', (req, res) => {
  if (isReady) {
    return res.status(200).send('Ready');
  }
  res.status(500).send('Not Ready');
});

// --------------------
// MAIN APP ENDPOINT
// --------------------
app.get('/', (req, res) => {
  res.send('Hello from Node.js app running in Kubernetes 🚀');
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// --------------------
// DEMO FAILURES (OPTIONAL)
// --------------------

// Simulate liveness failure after 30 seconds
setTimeout(() => {
  console.log('Simulating liveness failure...');
  isHealthy = false;
}, 30000);

// Simulate readiness failure after 60 seconds
setTimeout(() => {
  console.log('Simulating readiness failure...');
  isReady = false;
}, 60000);
