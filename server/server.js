import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import env from './config/environments/dev.json'
import log from './logger'
import routes from './routes'

import bodyParser from 'body-parser'

const app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(env.mongo.uri, env.mongo.options);

app.get('/', (req,res) => { 
  res.status(200).send("static content"); 
});

routes(app);

app.get('*', function(req, res){
  res.status(404).send('404 PAGE NOT FOUND');
});


app.server.listen(env.port, env.hostname, () => {
  log.info('Express server listening on %d, in %s mode', env.port, app.get('env'));
});

export default app;
