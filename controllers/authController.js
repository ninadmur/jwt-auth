import User from '../models/Users.js';
import jwt from 'jsonwebtoken';

const createToken = id => {
  return jwt.sign({ id }, 'Ninad007', { expiresIn: '10days' });
};

const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
};

export const getsignIn = (req, res) => {
  res.render('signIn');
};
export const getsignUp = (req, res) => {
  res.render('signUp');
};
export const postsignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (err) {
    return json.status(400).json({});
  }
};
export const postsignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
