import router from 'express'
import * as controller from './thing.controller'
import { isAuthenticated } from '../../services/auth'

const Router = router();

Router.get('/', controller.list);
Router.get('/:id', controller.item);
Router.post('/', isAuthenticated(), controller.create);
Router.put('/:id', isAuthenticated(), controller.update);
Router.patch('/:id', isAuthenticated(), controller.update);
Router.delete('/:id', isAuthenticated(), controller.destroy);

export default Router;