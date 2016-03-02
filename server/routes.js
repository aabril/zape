import things from './api/things'

let routes = (app) => {
  app.use('/api/things', things);
};

export default routes;