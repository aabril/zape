import authResource from './resources/auth'
import userResource from './resources/user'
import imageResource from './resources/image'
import thingResource from './resources/thing'

const indexRequest = (req, res) => { 
  return res.status(200).json({title: 'Hey', message: 'Hello there!'});
}

const notFoundRequest = (req, res) => { 
  res.status(404).send('404 PAGE NOT FOUND'); 
}

const routes = (app) => {
  app.get('/', indexRequest);
  app.use('/auth', authResource);
  app.use('/users', userResource);
  app.use('/images', imageResource);
  app.use('/things', thingResource);
  app.get('*', notFoundRequest);
};

export default routes;