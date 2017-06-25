import express from 'express'
import config from '../config.json'
import routes from './routes'
import middlewares from './middlewares'
import bunyan from 'bunyan'

const log = bunyan.createLogger({name: 'run', level: 'info'});
const app = express();

middlewares(app)
routes(app);

const PORT = process.env.PORT || config.dev.PORT;
app.listen(PORT, () => {
  if(process.env.NODE_ENV==="dev" || config.dev.NODE_ENV==='dev') {
    log.info('Express server listening on %d', PORT);
  }
});

export default app
