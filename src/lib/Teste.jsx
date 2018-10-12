// @flow

import React from 'react';

type Props = {
  name: 'string',
  age: 'integer',
};

type State = {};

class Teste extends React.Component<Props, State> {
  render() {
    return (
      <GridApi
        api="alguma_api"
        module="algum_modulo"
        label="algum_label"
        filterOptions={[{ label: 'alguma operação', value: 'algum valor' }]}
        formName="algum_form"
        columnDefs={gridColumns()}
        onEdit={this.handleEdit}
        onNew={this.handleNew}
      />
    );
  }
}

export default Teste;
