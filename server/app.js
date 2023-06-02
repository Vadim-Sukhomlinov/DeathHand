require('dotenv').config();
require('@babel/register');

const morgan = require('morgan');
const path = require('path');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

const PORT = process.env.PORT || 3001;

const sessionConfig = {
  name: 'DH',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'vadim',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('Solo');
    res.redirect('/');
  });
});

app.listen(`${PORT}`, () => {
  console.log('Server started on port 3000');
});
