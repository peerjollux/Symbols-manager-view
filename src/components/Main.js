require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ListItem from './ListItem'
import Column from './Column'
import * as API from '../actions/api'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class AppComponent extends React.Component {

  /* Set initial state */
  state = {
    symbols: Symbols,
    selected: []
  }

  focusedItem = null;

  /* Connectin API to helper functions */
  getList         = (props) => ( API.getList(this.state, props) )
  getColumns      = ()      => ( API.getColumns(this.state) )


  selectListItem(props) {
    this.setState({selected: props.path});
  }

  setFocusedItem(props){
    this.focusedItem = props.path
  }
  /* Render helper functions */
  renderColumns(){
    const columns = this.getColumns()
    const { selected } = this.state;
    return (
      columns.map( (selectedIndex, columnIndex) => {
        const listData = this.getList({selectedIndex: selectedIndex});
        const selectedItem = selected[columnIndex]
        return (
          this.renderColumn({
            list: listData,
            columnIndex: columnIndex,
            selectedItem: selectedItem
          })
        )
      })
    )
  }

  renderColumn(props){
    const { list, selectedItem, columnIndex } = props;

    if(list){
      return (
        <Column className={'column'} ref={'column'+columnIndex} columnIndex={columnIndex} key={columnIndex} >
          { list.map( (item, rowIndex) => {
            const selected = (selectedItem === rowIndex)
            return (
              <ListItem
                data={item}
                key={rowIndex}
                selected={selected}
                onClick = { () => this.selectListItem({path: item.path }) }
                onMouseDown = { () => this.setFocusedItem({path: item.path }) }
              />
            )
          })}
        </Column>
      );
    }
  }

  render() {
    return (
      <div className='columns-wrapper'>
        { this.renderColumns() }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(AppComponent)
