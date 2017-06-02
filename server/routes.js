import apiRequest from './controllers/api'
import authRequest from './controllers/auth'

const indexRequest = (req, res) => { 
  return res.status(200).json({title: 'Hey', message: 'Hello there!'});
}

const notFoundRequest = (req, res) => { 
  res.status(404).send('404 PAGE NOT FOUND'); 
}

const routes = (app) => {
  app.get('/', indexRequest);
  app.use('/api', apiRequest);
  app.use('/auth', authRequest);
  app.get('*', notFoundRequest);
};

export default routes;