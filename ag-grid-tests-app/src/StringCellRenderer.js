import React, {Component} from 'react';

export default class StringCellRenderer extends Component {
  render() {
    return (
      <div>
        <span>StringCellRenderer</span><span>{this.props.value}</span>
      </div>
    );
  }
}