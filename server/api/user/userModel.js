import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  // don't store the password as plain text
  password: {
    type: String,
    required: true
  }
});

// middleware that will run before a document
// is created
UserSchema.pre('save', function(next) {

  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

UserSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10); // explore async which is better but more complex
      return bcrypt.hashSync(plainTextPword, salt);
    }
  },

  toJson: function () {
    var obj = this.toObject();
    delete obj.password;
    return obj
  }
};

export default mongoose.model('user', UserSchema);