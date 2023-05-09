const morgan = require('morgan');
const path  = require('path');
const express = require('express');

const app = express();
app.set('view engine', 'ejs')

const PORT = 3000;

const createPath = (page) => path.resolve(process.cwd(), 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log('Server started!');
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'Telegram', link: 'https://t.me/polina_kutcenko' },
    { name: 'GitLab', link: 'https://gitlab.com/PolinaKutsenkoScrapeit' },
    { name: 'GitHub', link: 'https://github.com/PolinaKutsenko' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  res.render(createPath('post'), { title });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('posts'), { title });
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
