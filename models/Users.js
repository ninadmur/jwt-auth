import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter email'],
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [8, 'Please enter min 8 characters'],
  },
});

// fire a function before doc saved to db
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error('Enter valid Password');
    }
  } else {
    throw Error('User not found');
  }
};

const User = mongoose.model('user', UserSchema);

export default User;
