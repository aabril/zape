import router from 'express'
import things from './thing'

const Router = router();

Router.use('/things', things);

Router.get('*', function(req, res){
  res.status(404).json({"module":"api", "msg":"endpoint not found", "status":404});
});

export default Router;