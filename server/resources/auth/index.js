import { Router } from 'express'
import passport from 'passport'
import User from '../user/user.model'
import config from '../../../config'
import local from './local'
import passportLocal from './passport/local'

const router = new Router();

passportLocal(User, config);
router.use('/local', local);
router.get('*', (req, res) => {
  return res.status(404).json({ msg: 'not found' })
});

export default Router;