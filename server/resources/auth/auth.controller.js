import * as controller from './auth.controller'

export function login (req, res) {
  return res.status(200).json(req.user);
}