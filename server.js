const morgan = require('morgan');
const path  = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const Post = require('./models/post');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs')

const db = 'mongodb+srv://polina:d5CkN0R3UYKEcLrI@cluster0.j7ovdbe.mongodb.net/news-app-server?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to DB!'))
  .catch((err) => console.log(err));

const createPath = (page) => path.resolve(process.cwd(), 'ejs-views', `${page}.ejs`);

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log('Server started!');
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  Contact
    .find()
    .then((contacts) => res.render(createPath('contacts'), { contacts, title }))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: "Error" });
    });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  console.log(req)
  Post
    .findById(req.params.id)
    .then((post) => {
      console.log(post)
      res.render(createPath('post'), { title, post })
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: "Error" });
    });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      console.log(posts)
      res.render(createPath('posts'), { title, posts })
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: "Error" });
    });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: "Error" });
    });
});

app.get('/add-post', (req, res) => {
  const title = 'Add post';
  res.render(createPath('add-post'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use((req, res) => {
  const title = 'Error Page';
  res
  .status(404)
  .render(createPath('error'), { title });
});
