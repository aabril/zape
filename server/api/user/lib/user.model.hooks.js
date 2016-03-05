let validatePresenceOf = function(value) {
  return value && value.length;
};

export default function(UserSchema){
  UserSchema
    .pre('save', function(next) {
      if (!this.isNew) return next();
      if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));
      else
        next();
    });
}