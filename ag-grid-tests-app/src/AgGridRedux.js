import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

import StringCellRenderer from './StringCellRenderer.js'

const colNum = 15
const rowNum = 500

const rowData = [...Array(rowNum).keys()]
            .map(i => {
                let row = {}
                let cols = [...Array(colNum).keys()]
                cols.forEach(colIdx => {
                  row["c_" + colIdx] = "val_" + i + "_" + colIdx
                })
                return row
            })

var initState = {
  rows: rowData
}


const gridStateToProps = (state) => {
  return {
    rows: state.rows
  }
}
const gridDispatchToProps = (dispatch) => {
  return {}
}


const gridCell = (Renderer) => {
  class Cell extends Component {
    render() {
      return (
        <React.Fragment>
          <Renderer />
        </React.Fragment>
      )
    }
  }
  return Cell
}


const cellStateToProps = () => {
  return (state, props) => {
    debugger;
    return {
    }
  }
}
const cellDispatchToProps = (dispatch, props) => {
  return {
  }
}
const connectCell = (Renderer) => connect(cellStateToProps, cellDispatchToProps, null, {forwardRef: true})(gridCell(Renderer))


class GridOnRedux extends Component {
  constructor(props) {
    super(props);
    let columnDefs =
        [...Array(colNum).keys()]
            .map(i => {
              return {
                headerName: "Col " + i,
                field: "c_" + i,
                idx: i,
                width: 80,
                cellRendererSelector: (params) => {
                  return {
                    component: 'stringCellRenderer'
                  }
                }
              }
            })
    let rowData = props.rows

    this.state = { columnDefs, rowData }
  }

  frameworkComponents = {
    stringCellRenderer: StringCellRenderer
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '1200px' }}
      >
        <AgGridReact
          reactNext={true}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          frameworkComponents={this.frameworkComponents}
          >
        </AgGridReact>
      </div>
    );
  }
}

const GridOnReactConnected = connect(gridStateToProps, gridDispatchToProps)(GridOnRedux)

const reducer = (state = initState, action) => {
  return state;
}

var store = createStore(reducer)

class App extends Component {
  render() {
    return (
      <div>
      <div>Redux Based Grid</div>
      <Provider store={store}>
        <GridOnReactConnected />
      </Provider>
      </div>
    )
  }
}

export default App;