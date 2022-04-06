import User from '../models/Users.js';

export const getsignIn = (req, res) => {
  res.render('signIn');
};
export const getsignUp = (req, res) => {
  res.render('signUp');
};
export const postsignIn = async (req, res) => {
  res.send('new SignIn');
};
export const postsignUp = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
