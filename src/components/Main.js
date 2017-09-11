require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';
import ListItem from './ListItem'
import KeyboardEvents from '../actions/KeyboardEvents'
const resolvePath = require('object-resolve-path');

import { selectNext } from '../actions/selecting'
import * as API from '../actions/api'


class AppComponent extends React.Component {
  state = {
    symbols: Symbols,
    selected: [],
  }

  keyboardShortcuts = {
    down: () => this.selectNextItem(),
    up: () => this.test()
  }

  constructor(props){
    super(props);

    this.KeyboardEvents = KeyboardEvents(this.keyboardShortcuts);
  }

  selectNextItem(){
    const prevState = this.state;

    this.setState(selectNext(prevState))
  }



  handleGetItem(){
    return getItem('prevState', 'props');
  }

  renameItem(){
    this.setState(API.renameItem(this.state));
  }

  saveItem(props){
    this.setState(API.saveItem(this.state, props));
  }

  /**
  * selectListItem() sets state.selected to the provided path
  */
  selectListItem(itemPath) {
    this.setState({selected: itemPath});
  }


  getSelectedItem(){
    return API.getSelectedItem(this.state);
  }

  isSelected(props) {
    return API.isSelected(this.state, props);
  }

  getItemById(props) {
    return API.getItemById(this.state, props);
  }

  getItemByColumn(props) {
    return API.getItemByColumn(this.state, props);
  }

  /**
  * Function to get a right objects array for right column.
  */
  renderListItem(index, key, columnIndex) {
    const item = this.getItemByColumn({index, columnIndex});
    const isSelected = this.isSelected({index, columnIndex});

    if(item){
      const onClick = () => this.selectListItem(item.path, item.type);
      return <ListItem key={key} onClick={onClick} data={item} selected={isSelected}/>;
    }
  }

  /**
  * Renders columns
  */
  renderColumn(columnIndex, key) {
    return (
      <div key={key} className="columns-wrapper__column">
        <ReactList
          itemRenderer={(index, key) => this.renderListItem(index, key, columnIndex)}
          itemKey= {key}
          length={4}
          type='uniform'
        />
      </div>
    );
  }

  render() {
    const { selected } = this.state;
    const columns = selected.length + 1;
    return (
      <div>
        <button onClick= {()=>this.renameItem()} >rename</button>
        <div className="columns-wrapper">
          <ReactList
            itemRenderer={::this.renderColumn}
            length={columns}
            axis='x'
            type='uniform'
          />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
