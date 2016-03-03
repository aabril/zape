import things from './api/thing'

let routes = (app) => {
  app.use('/api/things', things);
};

export default routes;