const gridRouter = require('express').Router();

gridRouter.get('/', (req, res) => {
  console.log('login the request');
  res.status(202).json({ ok: true });
});

module.exports = gridRouter;
