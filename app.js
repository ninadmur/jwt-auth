import express from 'express';
import mongoose from 'mongoose';
import AuthRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();

// middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://ninad:ninad007@cluster0.usjci.mongodb.net/Auth?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(result => app.listen(8000))
  .catch(err => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(AuthRoutes);

app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false);
  res.send('Cookie set');
});
