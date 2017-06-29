import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import crypto from 'crypto';
const authTypes = ['github', 'twitter', 'facebook', 'google'];

const UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true, unique : true, required : true, dropDups: true },
  role: { type: String, default: 'user' },
  hashedPassword: String,
  provider: String,
  salt: String,
  twitter: {},
  google: {},
  github: {}
});

/** Virtuals **/
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });


/** Validations **/

UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.includes(this.provider)) return true;
    return email.length;
  }, 'Email cannot be blank');

UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.includes(this.provider)) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// UserSchema
//   .path('email')
//   .validate(function(value, respond) {
//     const self = this;
//     this.constructor.findOne({email: value}, (err, user) => {
//       if(err) throw err;
//       if(user) {
//         if(self.id === user.id) return respond(true);
//         return respond(false);
//       }
//       respond(true);
//     });
// }, 'The specified email address is already in use.');

const validatePresenceOf = value => value && value.length;

/** Pre-save hook **/

UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && !authTypes.includes(this.provider))
      next(new Error('Invalid password'));
    else
      next();
  });

/** Methods **/

UserSchema.methods = {
  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword(password) {
    if (!password || !this.salt) return '';
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
  }
};

export default mongoose.model('User', UserSchema);
