require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Column from './Column'
import * as API from '../actions/api'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  dropItem,
  selectParent,
  selectNext
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
    let payload = API.moveItem(symbols, selected, lastClicked, columnIndex);

    return this.props.dropItem(payload)
  }

  renderColumns(){
    const { lastClicked, selected, symbols } = this.props
    const columns = this.getColumns()

    return (
      columns.map((selectedIndex, columnIndex) => {
        const list = API.getList({selected, symbols}, {selectedIndex});

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
      <div className='window' >
        <div className='columns-wrapper'>
          { this.renderColumns() }
        </div>
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

AppComponent = connect(mapStateToProps, {dropItem, selectParent, selectNext})(AppComponent)
export default DragDropContext(HTML5Backend)(AppComponent)
