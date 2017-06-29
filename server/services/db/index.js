import mongoose from 'mongoose'
import config from '../../../config.json'

export default () => {
  const MONGO_URI = process.env.MONGO_URI || config.MONGO_URI;
  mongoose.connect(MONGO_URI);
}