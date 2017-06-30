import router from 'express'
import passport from 'passport'
import User from '../user/user.model'
import config from '../../../config'
import * as controller from './auth.controller'
import passportLocal from './passport/local'

passportLocal(User)

const Router = router();

Router.post('/login', controller.login);
Router.post('/register', controller.register);

export default Router;
