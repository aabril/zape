import passport from 'passport'
import * as controller from './auth.controller'
import User from '../user/user.model'
import { registerLocalUser, signToken } from '../../services/auth'

export function login (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

    const token = signToken(user._id, user.role);
    const output = { "token" : token, "user_id" : user._id };

    return res.status(200).json(output);
  })(req, res, next)
}

export function register (req, res) {
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  if(!(email && password && name)){ 
    return res.status(401).json({ "error": { "code":123 , "description":"missing parameters: email, password, name."}});
  }

  // Todo (promised)
  // registerLocalUser(email, password, name)
  //   .then((user) => { return res.json(user) })
  //   .catch((err) => { return res.json(err) })

  registerLocalUser(email, password, name, res)

}