import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../../api/user/user.model'


export default function(User, config) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  const passportCb = (email, password, done) => {

    let userFindOneCb = function (err, user) {

      console.log(user);

      if (err) { return done(err); }
      if (!user) {  return done(null, false, {message: 'This email is not registered.'}); }
      if (!user.authenticate(password)) { return done(null, false, {message: 'This password is not correct.'}); }
      return done(null, user);
    }

    User.findOne({email: email}, userFindOneCb);
  };

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, passportCb));
};