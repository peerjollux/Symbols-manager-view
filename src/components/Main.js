require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';
import ListItem from './ListItem'
// import KeyboardEvents from '../actions/KeyboardEvents'
// import { selectNext } from '../actions/selecting'
import * as API from '../actions/api'


class AppComponent extends React.Component {

  /***********************
  **  STATE & VARIABLES **
  ***********************/
  state = {
    symbols: Symbols,
    selected: []
  }

  keyboardShortcuts = {
    down: () => this.selectNextItem(),
    up: () => this.test()
  }

  /******************************************
  **  CONNECTING EXTERNAL HELPER FUNCTIONS **
  ******************************************/
  renameItem() {
    return this.setState( () => API.renameItem(this.state) );
  }

  selectListItem(props) {
    return this.setState(props);
  }

  isSelected(props) {
    return API.isSelected(this.state, props);
  }

  getItemByColumn(props) {
    return API.getItemByColumn(this.state, props);
  }


  /****************************
  ** RENDER HELPER FUNCTIONS **
  ****************************/
  renderListItem(rowIndex, key, columnIndex) {
    const item = this.getItemByColumn({ rowIndex, columnIndex });
    const isSelected = this.isSelected({ rowIndex, columnIndex });

    if (item) {
      const { path } = item;
      const onClick = () => this.selectListItem({selected: path});
      return (
        <ListItem
          key = { key }
          onClick = { onClick }
          data = { item }
          selected = { isSelected }
        />
      );
    }
  }

  renderColumn(columnIndex, key) {
    return (
      <div key = {key} className = "columns-wrapper__column" >
        <ReactList
          itemRenderer = { (index, key) => this.renderListItem(index, key, columnIndex)}
          itemKey = { key }
          length = { 4 }
          type = 'uniform'
          />
      </div>
    );
  }

  render() {
    const {
      selected
    } = this.state;
    const columns = selected.length + 1;
    return (
      <div>
        <button onClick = { () => this.renameItem()} > rename < /button>
        <div className = "columns-wrapper" >
          <ReactList
            itemRenderer = {::this.renderColumn}
            length = { columns }
            axis = 'x'
            type = 'uniform'
          />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
