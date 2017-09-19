require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ListItem from './ListItem'
import Column from './Column'
// import KeyboardEvents from '../actions/KeyboardEvents'
// import { selectNext } from '../actions/selecting'
import * as API from '../actions/api'
const resolvePath = require('object-resolve-path');

const initialState = {
  symbols: Symbols,
  selected: [1, 0],
  columns: [null],
}

class AppComponent extends React.Component {

  /* State and variables */
  constructor(props){
    super(props);

    this.state = {
      ...initialState,
    }
  }

  keyboardShortcuts = {
    down: () => this.selectNextItem(),
    up: () => this.test()
  }

  /* Connectin API to helper FUNCTIONS */
  getList     = (props) => ( API.getList(this.state, props) )
  getColumns  = ()      => ( API.getColumns(this.state) )



  renderColumns(){
    const columns = this.getColumns()
    const { selected } = this.state;
    return (
      columns.map( (selectedIndex, columnIndex) => {
        const listData = this.getList({selectedIndex: selectedIndex});
        const selectedItem = selected[columnIndex]
        return <Column list={listData} key={columnIndex} selectedItem={selectedItem} />
      })
    )
  }

  render() {
    const { symbols, selected } = this.state;

    return (
      <div className='columns-wrapper'>
        { this.renderColumns() }
      </div>
    );
  }
}



export default AppComponent;
