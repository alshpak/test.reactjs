import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

import StringCellRenderer from './StringCellRenderer.js'

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
    console.log("start grid")
    let columnDefs = [
      {
        headerName: "Col1",
        field: "v1",
        width: 100,
        cellRendererSelector: (params) => {
          return {
            component: 'stringCellRenderer'
          }
        }
      },
      {
        headerName: "Col2",
        field: "v2",
        width: 100,
        cellRendererSelector: (params) => {
          return {
            component: 'stringCellRenderer'
          }
        }
      }
    ]
    const rowData = props.rows;
    this.state = { columnDefs, rowData }
  }

  frameworkComponents = {
    stringCellRenderer: connectCell(StringCellRenderer)
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


var initState = {
  rows: [ { v1: "val1", v2: "val2"} ]
}
const reducer = (state = initState, action) => state;

var store = createStore(reducer)


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <GridOnReactConnected />
      </Provider>
    )
  }
}

export default App;