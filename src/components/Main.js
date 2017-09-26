require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Column from './Column'
import * as API from '../actions/api'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  dropItem
} from '../actions';
import { connect } from 'react-redux';


class AppComponent extends React.Component {
  getColumns(){
    const { selected } = this.props
    let columns = [null]
    selected.map( (v, i) => {
      columns.push(i)
    })
    return columns;
  }

  onDrop(columnIndex){
    let { symbols, selected, lastClicked } = this.props
    console.log(columnIndex)
    let payload = API.moveItem(symbols, selected, lastClicked, columnIndex);

    return this.props.dropItem(payload)
  }

  renderColumns(){
    const { lastClicked, selected } = this.props
    const columns = this.getColumns()

    return (
      columns.map((selectedIndex, columnIndex) => {
        const list = API.getList(selectedIndex);

        if(list){
          return (
            <Column
              list={list}
              onDrop={ () => this.onDrop(columnIndex)}
              state={{lastClicked, selected}}
              className={'column'}
              ref={'column'+columnIndex}
              columnIndex={columnIndex}
              key={columnIndex}
              />
          )
        }
      })
    )
  }

  render() {
    return (
      <div className='columns-wrapper'>
        { this.renderColumns() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    symbols: state.SymbolsReducer.symbols,
    selected: state.SelectionReducer.selected,
    lastClicked: state.SelectionReducer.lastClicked
  }
}

const AppComponentWithData = connect(mapStateToProps, {dropItem})(AppComponent)
export default DragDropContext(HTML5Backend)(AppComponentWithData)
