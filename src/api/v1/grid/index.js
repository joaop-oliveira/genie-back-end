const gridRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const gridApi = require('../../../lib/Grid');
const config = require('../../../config');

gridRouter.post('/', (req, res) => {
  const newGrid = gridApi(req.body);
  const filePath = path.join(config.getWorkspace(req.body.module), `${req.body.name}.jsx`);
  const formattedData = prettier.format(newGrid, {
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    jsxBracketSameLine: false,
  });
  fs.writeFile(filePath, formattedData, (err) => {
    if (err) {
      res.status(422).json({ err });
    } else {
      res.status(202).send(formattedData);
    }
  });
});

module.exports = gridRouter;
