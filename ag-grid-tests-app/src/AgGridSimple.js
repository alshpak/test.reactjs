import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import StringCellRenderer from './StringCellRenderer.js'

var colNum = 15
var rowNum = 500

class App extends Component {
  constructor(props) {
    super(props);
    let columnDefs =
        [...Array(colNum).keys()]
            .map(i => {
              return {
                headerName: "Col " + i,
                field: "c_" + i, idx: i,
                width: 80 //,
                // cellRendererSelector: {
                //   component:
                // }
              }
            })
    let rowData = [...Array(rowNum).keys()]
            .map(i => {
                let row = {}
                columnDefs.forEach(col => row[col.field] = "val_" + i + "_" + col.idx)
                return row
            })
    this.state = { columnDefs, rowData }
  }

  frameworkComponents = {
    stringCellRenderer: StringCellRenderer
  };

  render() {
    return (
      <div>
      <div>Simple Grid</div>
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '1200px' }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          frameworkComponents={this.frameworkComponents}
          >
        </AgGridReact>
      </div>
      </div>
    );
  }
}

export default App;