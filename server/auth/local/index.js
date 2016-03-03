import router from 'express'
const Router = router();

Router.post('/', function(req, res, next){
  next()
});

export default Router;