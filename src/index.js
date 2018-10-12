const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const apiRouter = require('./api');

const logger = morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'),
  '-',
  tokens['response-time'](req, res),
  'ms',
  '- params: ',
  JSON.stringify(req.query, null, 2),
].join(' '));

app.use(logger);

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

server.listen(8080);
