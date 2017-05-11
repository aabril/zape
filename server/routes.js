import indexRequest from './index'
import apiRequest from './api'
import authRequest from './auth'
import notFoundRequest from './notFound'

const routes = (app) => {
  app.use('/', indexRequest);
  app.use('/api', apiRequest);
  app.use('/auth', authRequest);
  app.get('*', notFoundRequest);
};

export default routes;