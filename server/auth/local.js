import router from 'express'
import passport from 'passport'

const Router = router();

// Router.post('/', authLocalPost);
Router.post('/', passport.authenticate('local'), (req, res, next) => {
  res.status(200).json(req.user);
});

export default Router;