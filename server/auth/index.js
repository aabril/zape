import {Router} from 'express'
import passport from 'passport'
import User from '../api/user/user.model'
import config from '../../config'
import local from './local'
import passportLocal from './passport/local'
import notFound from '../notFound'

const router = new Router();
passportLocal(User, config);
router.use('/local', local);
router.get('*', notFound);

export default Router;