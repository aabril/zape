import bodyParser from 'body-parser'
import passport from 'passport'
import mongoose from 'mongoose'
import config from '../config.json'

export default (app) => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.set('views', 'client')
  app.set('view engine', 'pug');
  const MONGO_URI = process.env.MONGO_URI || config.dev.MONGO_URI;
  mongoose.connect(MONGO_URI);
}