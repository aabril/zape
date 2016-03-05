import mongoose from 'mongoose'

import methods from './lib/user.model.methods'
import hooks from './lib/user.model.hooks'
import validations from './lib/user.model.validations'
import virtuals from './lib/user.model.virtuals'


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { 
  	type: String, 
  	lowercase: true
  },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  twitter: {},
  google: {},
  github: {}
}, {timestamps: true});

UserSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
  }
});

hooks(UserSchema);
methods(UserSchema);
validations(UserSchema);
virtuals(UserSchema);

export default mongoose.model('User', UserSchema)