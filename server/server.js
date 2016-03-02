import http from 'http'
import express from 'express'
import env from './config/environments/dev.json'
import bunyan from 'bunyan'
import routes from './routes'

let app = express();
app.server = http.createServer(app);

let log = bunyan.createLogger({name: 'run', level: 'info'});

routes(app);

app.server.listen(env.port, env.hostname, () => {
  log.info('Express server listening on %d, in %s mode', env.port, app.get('env'));
});

export default app;
