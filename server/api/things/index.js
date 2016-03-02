import router from 'express'
import * as controller from './things.controller'

const Router = router();

Router.get('/', controller.list);
Router.get('/:id', controller.item);
Router.post('/', controller.create);
Router.put('/:id', controller.update);
Router.patch('/:id', controller.update);
Router.delete('/:id', controller.destroy);

export default Router;