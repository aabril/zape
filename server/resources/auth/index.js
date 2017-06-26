import router from 'express'
import passport from 'passport'
import User from '../user/user.model'
import config from '../../../config'
import * as controller from './auth.controller'

const Router = router();

Router.post('/', passport.authenticate('local'), controller.login);

export default Router;
