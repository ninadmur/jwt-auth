import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter username'],
  },
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

const User = mongoose.model('user', UserSchema);

export default User;
