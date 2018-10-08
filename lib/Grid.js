const fs = require('fs');
const _ = require('lodash');
const getConfig = require('../config');

function Grid(name) {
  this.gridAnnotations = '';
  this.gridImports = '';
  this.gridName = name;
  this.filterOptions = [];
  this.getTemplate = (callback) => {
    fs.readFile(`${getConfig().grid()}`, (err, data) => {
      if (err) {
        console.log(
          'O erro a seguir foi apresentado ao ler o arquivo de configuração da Grid... ',
          err,
        );
        return null;
      }
      const gridConfig = JSON.parse(data);
      gridConfig.header.annotations.forEach((annotation) => {
        this.gridAnnotations += `${annotation} \n`;
      });
      gridConfig.header.imports.forEach((importation) => {
        this.gridImports += `${importation} \n`;
      });
      this.filterOptions = JSON.stringify(gridConfig.body.content.gridProps.filterOptions);
      callback(
        `
    ${this.gridAnnotations}
    \n \n
    ${this.gridImports}
    \n \n
    type Props = ${JSON.stringify(gridConfig.types.props, null, 2)}
    \n
    type State = ${JSON.stringify(gridConfig.types.state, null, 2)}
    \n
    class ${this.gridName} extends React.Component<Props, State> {
      render() {
        return (
          <GridApi
            api="${gridConfig.body.content.gridProps.api}"
            module="${gridConfig.body.content.gridProps.module}"
            label="${gridConfig.body.content.gridProps.label}"
            filterOptions={${this.filterOptions}}
            formName="${gridConfig.body.content.gridProps.form_name}"
            columnDefs={gridColumns()}
            onEdit={this.handleEdit}
            onNew={this.handleNew}
          />
        );
      }
    }

    export default ${this.gridName};
    \n 
  `,
        this.gridName,
      );
    });
  };
}

module.exports = Grid;
