import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../../user/user.model'


export default function(User) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  const localStrategyCb = (email, password, done) => {
    User.findOne({email}, (err, user) => {
      if (err) { return done(err); }
      if (!user) {  return done(null, false, {message: 'This email is not registered.'}); }
      if (!user.authenticate(password)) { return done(null, false, {message: 'This password is not correct.'}); }
      return done(null, user);
    })
  };

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, localStrategyCb));
}
