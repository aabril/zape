import express from 'express'
import router from 'express'
import passport from 'passport'
import config from '../config/environments/dev.json'

import local from './local'

const Router = router();

Router.use('/local', local);
// router.use('/twitter', twitter);
// router.use('/google', google);
// router.use('/facebook', facebook);

Router.get('*', function(req, res){
  res.status(404).json({"module":"auth", "msg":"endpoint not found", "status":404});
});

export default Router;