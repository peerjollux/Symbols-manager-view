require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Column from './Column'
import * as API from '../actions/api'
import { DragDropContext } from 'react-dnd';
import KeyboardShortcuts from '../actions/KeyboardShortcuts'
import HTML5Backend from 'react-dnd-html5-backend';
import keydown, { ALL_KEYS } from 'react-keydown'
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
    const { keydown } = this.props
    if ( keydown.event ) {
      switch (keydown.event.which) {
        case keyCodes.left:
          return this.props.selectParent()
          break;
        case keyCodes.up:
          up();
          break;
        case keyCodes.right:
          right();
          break;
        case keyCodes.down:
          console.log('test')
          break;
        case keyCodes.enter:
          enter();
          break;
        default:
      }
    }

    return (
      <div className='window' >
        <div className='columns-wrapper'>
          { this.renderColumns() }
        </div>
      </div>
    )
  }
}

const keys = [ 37, 38, 39, 40, 13 ]
const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13
}

const mapStateToProps = state => {
  return {
    symbols: state.SymbolsReducer.symbols,
    selected: state.SelectionReducer.selected,
    lastClicked: state.SelectionReducer.lastClicked
  }
}

AppComponent = keydown(keys)(AppComponent);
AppComponent = connect(mapStateToProps, {dropItem, selectParent, selectNext})(AppComponent)
export default DragDropContext(HTML5Backend)(AppComponent)
