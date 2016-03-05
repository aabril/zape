export default function(UserSchema){
  // Validate empty email
  UserSchema
    .path('email')
    .validate(function(email) {
      if (authTypes.indexOf(this.provider) !== -1) return true;
      return email.length;
    }, 'Email cannot be blank');

  // Validate empty password
  UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
      if (authTypes.indexOf(this.provider) !== -1) return true;
      return hashedPassword.length;
    }, 'Password cannot be blank');

  // Validate email is not taken
  UserSchema
    .path('email')
    .validate(function(value, respond) {
      var self = this;
      this.constructor.findOne({email: value}, function(err, user) {
        if(err) throw err;
        if(user) {
          if(self.id === user.id) return respond(true);
          return respond(false);
        }
        respond(true);
      });
  }, 'The specified email address is already in use.');
}