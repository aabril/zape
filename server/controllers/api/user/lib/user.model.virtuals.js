export default function(UserSchema){
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

  // Public profile information
  UserSchema
    .virtual('profile')
    .get(function() {
      return {
        'name': this.name,
        'role': this.role
      };
    });

  // Non-sensitive info we'll be putting in the token
  UserSchema
    .virtual('token')
    .get(function() {
      return {
        '_id': this._id,
        'role': this.role
      };
    });
}