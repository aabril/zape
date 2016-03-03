import apiRequest from './api'
import authRequest from './auth'

let routes = (app) => {
  app.use('/api', apiRequest);
  app.use('/auth', authRequest);
};

export default routes;