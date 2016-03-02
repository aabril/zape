import http from 'http';
import express from 'express';

var app = express();
app.server = http.createServer(app);

app.use('/', (req, res) => res.send("hello world"));

app.server.listen(8080, "127.0.0.1", function () {
  console.log('Express server listening on %d, in %s mode', 8080, app.get('env'));
});

export default app;
