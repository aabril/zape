import router from 'express'
const Router = router();

Router.get('*', function(req, res){
  res.status(404).json({"module":"auth", "msg":"endpoint not found", "status":404});
});

export default Router;