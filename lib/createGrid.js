const fs = require('fs');
const _ = require('lodash');

const obj = {
  TYPE_PROPS: {
    name: 'string',
    age: 'number',
  },
  TYPE_STATE: {
    name: 'string',
    age: 'number',
  },
  FILE_NAME: 'TestCadastro',
};

function createGrid() {
  fs.readFile('./lib/templates/Grid.txt', (err, buff) => {
    if (err) {
      console.log(err);
    }
    const data = buff.toString();
    Object.keys(obj).forEach((item) => {
      if (_.isObject(obj[item])) {
        console.log(JSON.stringify(obj[item], null, 2));
        console.log(`#{${item.toString()}}`);
        data.replace(`#{${item.toString()}}`, JSON.stringify(obj[item], null, 2));
      }
      console.log(data);
    });
  });
}

createGrid();
