import express from 'express'
import config from '../config.json'
import log from './logger'
import routes from './routes'
import expressConfig from './expressConfig'

const app = express();

expressConfig(app)
routes(app);

const PORT = process.env.PORT || config.dev.PORT;
app.listen(PORT, () => {
  if(process.env.NODE_ENV==="dev") {
    log.info('Express server listening on %d', PORT);
  }
});

export default app