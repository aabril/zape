import mongoose from 'mongoose';
import passport from 'passport';
import config from '../../../config.json';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../../resources/user/user.model';
const validateJwt = expressJwt({secret: config.SESSION_SECRET});


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
  return jwt.sign({_id: id}, config.SESSION_SECRET, {expiresInMinutes: 60*5});
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

export {isAuthenticated};
export {hasRole};
export {signToken};
export {setTokenCookie};