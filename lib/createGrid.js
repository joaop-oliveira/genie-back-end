const fs = require("fs");
const _ = require("lodash");

const obj = {
  TYPE_PROPS: [
    { name: "myProp", type: "string" },
    { name: "myProp2", type: "number" }
  ],
  TYPE_STATE: [
    { name: "myState", type: "string" },
    { name: "myState2", type: "number" }
  ],
  FILE_NAME: "TestCadastro"
};

function createGrid() {
  fs.readFile("./lib/templates/Grid.txt", (err, buff) => {
    const data = buff.toString();
    Object.keys(obj).forEach(item => {
      if (_.isArray(obj[item])) {
        obj[item].forEach(prop => {
          console.log('Item ====>> ', `#{${item.toString()}}`);
          data.replace(
            `#{${item.toString()}}`,
            `${JSON.stringify(prop.name)}: ${JSON.stringify(prop.type)}`
          );
          console.log(data);
        });
      }
    });
  });
}

createGrid();
