const fs = require('fs');
const prettier = require('prettier');
const Grid = require('./Grid');

const grid = new Grid('Teste');

function createGrid(data, name) {
  const formattedData = prettier.format(data, {
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    jsxBracketSameLine: false,
  });
  console.log(formattedData);
  fs.writeFile(`${__dirname}/${name}.jsx`, formattedData, (err) => {
    if (err) {
      console.log('Houve um Erro na criação do arquivo grid');
    }
  });
}

grid.getTemplate(createGrid);
