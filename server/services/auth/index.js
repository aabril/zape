import mongoose from 'mongoose';
import passport from 'passport';
import config from '../../../config.json';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../../resources/user/user.model';
const validateJwt = expressJwt({secret: config.SESSION_SECRET});

mongoose.Promise = Promise

function validateToken (req, res, next) {
  if(req.query && req.query.hasOwnProperty('access_token')){
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }
  validateJwt(req, res, next); 
}

function findUserAndRegisterOnRequest (req, res, next){
  User.findById(req.user._id, (err, user) => {
    if (err){ return next(err); }
    if (!user){ return res.send(401); }
    req.user = user;
    return next();
  });
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose().use(validateToken).use(findUserAndRegisterOnRequest);
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired){ throw new Error('Required role needs to be set'); }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)){
        next();
      }else{
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({_id: id}, config.SESSION_SECRET, {expiresIn: 60*60*5});
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user){ return res.json(404, {message: 'Something went wrong, please try again.'}); }
  const token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  return res.redirect('/');
}

// ToDo: as a promise
// function registerLocalUser(email, password, name) {
//   return new Promise(function(resolve, reject) {
//     const newUserData = {
//       email: email,
//       password: password,
//       name: name
//     }

//     let newUser = new User(newUserData)
//     newUser.provider = 'local'
//     newUser.role     = 'user'
//     console.log(newUser)

//     newUser.save( (err, user) => {
//       if (err) reject(err);
//       user.token = signToken(user._id)
//       resolve(user);
//     })
//   });
// }

function registerLocalUser(email, password, name, res) {
    const newUserData = {
      email: email,
      password: password,
      name: name
    }
    let newUser = new User(newUserData)
    newUser.provider = 'local'
    newUser.role     = 'user'
    newUser.save( (err, user) => {
      if (err){
        let errOutput;
        if(err.code && err.code===11000) {
          errOutput = { msg: 'user already registered' }
        }else{
          errOutput = err
        }
        return res.json(errOutput)
      }
      
      user.token = signToken(user._id)
      const userOutput = {
        email: user.email
      }
      return res.json(userOutput)
    })
}


export {isAuthenticated};
export {hasRole};
export {signToken};
export {setTokenCookie};
export {registerLocalUser};
