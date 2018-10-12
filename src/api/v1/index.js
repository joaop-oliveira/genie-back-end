const v1Router = require('express').Router();

const gridRouter = require('./grid');

v1Router.use('/grid', gridRouter);

module.exports = v1Router;
