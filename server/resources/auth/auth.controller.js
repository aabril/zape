import * as controller from './auth.controller'
import User from '../../resources/user/user.model'

export function login (req, res) {
  return res.status(200).json(req.user);
}

export function register (req, res) {
  User.create(req.body, function(err, user) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(user);
  })
}