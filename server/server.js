import express from 'express'
import config from '../config.json'
import log from './logger'
import routes from './routes'
import expressConfig from './expressConfig'

const app = express();

routes(app);
expressConfig(app)

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
  log.info('Express server listening on %d', PORT);
});
