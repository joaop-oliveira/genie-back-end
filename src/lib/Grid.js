function GridApi({
  name, header, propTypes, stateTypes, props, filterOptions, api, endpoint,
}) {
  const gridImports = header.imports.join('\n');
  const annotations = header.annotations.join('\n');
  const statetype = {
    control: 'Object',
    session: 'Object',
    ...stateTypes,
  };
  return `
  ${annotations}
  \n \n
  import React, { Fragment } from 'react';
  import { GridApi, goTo, Http } from 'components';
  ${gridImports}
  \n \n
  type Props = ${JSON.stringify(propTypes, null, 2)}
  \n
  type State = ${JSON.stringify(statetype, null, 2)}
  \n
  class ${name} extends React.Component<Props, State> {

    state = {
      control: {},
      session: {},
    };

    handleGridState = (gridState): void => {
      console.log('gridState  ', gridState);
      this.setState((state: State) => ({
        ...state,
        session: {
          ...state.session,
          gridState,
        },
      }));
    };


    handleRowNavigate = ({ api }: Object): void => {
      this.setState(
        (state: State): State => ({
          ...state,
          control: {
            rowSelected: api.getSelectedNodes()[0].data,
          },
        })
      );
    };

    handleSelection = ({ data }: Object): void => {
      this.setState(
        (state: State): State => ({
          ...state,
          control: {
            rowSelected: data,
          },
        })
      );
    };

    // Por favor insira o campo de parametrizacao para a edição do cadastro [field]
    handleDoubleClick = async (): void => {
      const { control, session } = this.state;
      const { get } = Http('${api}');
      get({
        endPoint: '${endpoint}',
        params: {
          ${props.primaryKeys}: control.rowSelected.${props.primaryKeys},
        },
      }).then(data => {
        goTo('cadastrar/${module}', {
          state: { edit: true, data, goBack: 'consultar/${module}', gridState: session.gridState },
        });
      });
    };

    handleNew = () => {
      const { session } = this.state;
      goTo('cadastrar/${module}', {
        state: { goBack: 'consultar/${module}', gridState: session.gridState },
      });
    };


    render() {
      const { control, session } = this.state;
      const { location } = this.props;
      return (
        <GridApi
          apiPrimaryKeys={${JSON.stringify(props.primaryKeys, null, 2)}}
          api="${props.gridEndpoint}"
          init
          initState={location.state.gridState}
          onStateChange={this.handleGridState}
          module="${props.gridApi}"
          label="${props.label}"
          filterOptions={${JSON.stringify(filterOptions, null, 2)}}
          formName="${props.form_name}"
          columnDefs={gridColumns()}
          rowClicked={this.handleSelection}
          rowDoubleClicked={this.handleDoubleClick}
          onSelectionChanged={this.handleRowNavigate}
          onEdit={this.handleDoubleClick}
          operations={[]}
          onNew={this.handleNew}
        />
      );
    }
  }

  export default ${name};
  \n 
`;
}

module.exports = GridApi;
