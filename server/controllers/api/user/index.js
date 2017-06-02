import router from 'express'
import * as controller from './user.controller'

const Router = router();

Router.get('/', controller.list);
Router.post('/', controller.create);
Router.get('/me', controller.me);
Router.get('/:id', controller.item);
Router.delete('/:id', controller.destroy);
// Router.put('/:id/password', controller.changePassword);

export default Router;