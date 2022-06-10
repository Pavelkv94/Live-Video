const express = require('express');
const app = express();

const { proxy, scriptUrl } = require('rtsp-relay')(app);

const handler = proxy({
  url: `rtsp://admin:1234567q@192.168.1.64:554/Streaming/Channels/1`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

// this is an example html page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`),
);

app.listen(2000, () => console.log('Server is Running'));