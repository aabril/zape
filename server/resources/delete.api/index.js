import router from 'express'
import things from './thing'
import users from './user'

const Router = router();

Router.use('/things', things);
Router.use('/users', users);

Router.get('*', function(req, res){
  res.status(404).json({"module":"api", "msg":"endpoint not found", "status":404});
});

export default Router;