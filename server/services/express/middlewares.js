import bodyParser from 'body-parser'
import passport from 'passport'
import config from '../../../config.json'

export default (app) => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(passport.initialize());
}