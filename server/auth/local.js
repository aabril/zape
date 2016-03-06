import router from 'express'
import passport from 'passport'

const Router = router();

// Router.post('/', authLocalPost);
Router.post('/', passport.authenticate('local'), (req, res, next) => {
  res.send("logged in")
});

export default Router;