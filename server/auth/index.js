import express from 'express'
import router from 'express'
import passport from 'passport'

import User from '../api/user/user.model'
import config from '../config/environments/dev.json'

import local from './local'
// import twitter from './twitter'
// import google from './google'
// import facebook from './facebook'

import passportLocal from './passport/local'
// import passportTwitter from './passport/twitter'
// import passportGoogle from './passport/google'
// import passportFacebook from './passport/facebook'

const Router = router();

/* Passport config */

passportLocal(User, config);
// passportTwitter(User, config);
// passportGoogle(User, config);
// passportFacebook(User, config);

/* Routes */

Router.use('/local', local);
// router.use('/twitter', twitter);
// router.use('/google', google);
// router.use('/facebook', facebook);

Router.get('*', function(req, res){
  res.status(404).json({"module":"auth", "msg":"endpoint not found", "status":404});
});

export default Router;