import http from 'http'
import express from 'express'
import env from './config/environments/dev.json'
import log from './logger'
import routes from './routes'

let app = express();
app.server = http.createServer(app);

app.get('/', (req,res) => { res.status(200).send("static content"); });

routes(app);

app.server.listen(env.port, env.hostname, () => {
  log.info('Express server listening on %d, in %s mode', env.port, app.get('env'));
});

export default app;