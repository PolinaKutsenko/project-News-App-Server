const http = require('http');
const fs  = require('fs');
const path  = require('path');

const PORT = 3000;
const createPath = (page) => path.resolve(process.cwd(), 'views', `${page}.html`);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  let path;
  switch (req.url) {
    case '/':
    case '/home':
    case '/index.html':
      path = createPath('index');
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    case '/contacts':
      path = createPath('contacts');
      res.statusCode = 200;
      break;
    default:
      path = createPath('error');
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, 'localhost', () => {
    console.log('Server started!');
});
