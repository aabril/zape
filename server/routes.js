import Router from 'express'
import things from './api/things'

let router = Router();

let routes = (app) => {
  app.use('/api/things', things);
};

export default routes;