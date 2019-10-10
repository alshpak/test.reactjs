import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AgGridSimple from './AgGridSimple.js';
import AgGridCustomRenderers from './AgGridCustomRenderers.js';
import AgGridRedux from './AgGridRedux.js';
//import App from './AgGridReduxTest.js';
import Freez from './Freez';
import * as serviceWorker from './serviceWorker';

import { createStore } from "redux";
import { Provider, connect } from 'react-redux';

class AppWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { screen: "Simple", log: [] }
    this.setScreen = this.setScreen.bind(this)
    this.showSimple = this.showSimple.bind(this)
    this.showCustomRenderers = this.showCustomRenderers.bind(this)
    this.showRedux = this.showRedux.bind(this)
  }
  setScreen(screen) {
    this.setState({ screen: screen, log: [] })
  }
  showSimple() { this.setScreen("Simple") }
  showCustomRenderers() { this.setScreen("CustomRenderer") }
  showRedux() { this.setScreen("Redux") }
  currentScreen() {
    switch (this.state.screen) {
      case "Simple": return <AgGridSimple />
      case "CustomRenderer": return <AgGridCustomRenderers />
      case "Redux": return <AgGridRedux />
    }
  }
  render() {
    return (
      <div>
        <Freez events = { this.state.log } />
        <div>
          <button onClick = { this.showSimple }>Simple Grid</button>
          <button onClick = { this.showCustomRenderers }>Custom Renderers Only</button>
          <button onClick = { this.showRedux }>Redux</button>
        </div>
        <div>
          { this.currentScreen() }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
