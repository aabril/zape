import http from 'http';
import express from 'express';
import env from './config/environments/dev.json'

var app = express();
app.server = http.createServer(app);

app.use('/', (req, res) => res.send("hello world"));

app.server.listen(env.port, env.hostname, function () {
  console.log('Express server listening on %d, in %s mode', env.port, app.get('env'));
});

export default app;
