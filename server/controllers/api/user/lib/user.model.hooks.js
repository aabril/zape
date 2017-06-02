let validatePresenceOf = function(value) {
  return value && value.length;
};

export default (UserSchema) => {
  UserSchema
    .pre('save', (next) => {
      if (!this.isNew){ return next() }
      if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1){
        return next(new Error('Invalid password'));
      }
      return next();
      
    });
}
