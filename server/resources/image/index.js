import router from 'express'
import * as controller from './image.controller'

import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const Router = router();

Router.get('/', controller.list);
Router.get('/:id', controller.item);
Router.post('/', upload.any(), controller.create);
Router.put('/:id', controller.update);
Router.patch('/:id', controller.update);
Router.delete('/:id', controller.destroy);

export default Router;