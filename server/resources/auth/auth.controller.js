import * as controller from './auth.controller'
import User from '../user/user.model'
import { registerLocalUser } from '../../services/auth'

export function login (req, res) {
  return res.status(200).json(req.user);
}

export function register (req, res) {
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  if(!(email && password && name)){ 
    return res.json(200, { "error": { "code":123 , "description":"missing parameters: email, password, name."}});
  }

  // Todo (promised)
  // registerLocalUser(email, password, name)
  //   .then((user) => { return res.json(user) })
  //   .catch((err) => { return res.json(err) })

  registerLocalUser(email, password, name, res)

}