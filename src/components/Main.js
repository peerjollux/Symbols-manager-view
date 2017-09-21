require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Column from './Column'
import * as API from '../actions/api'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';


class AppComponent extends React.Component {

  getList(selectedIndex){
    const { symbols, selected } = this.props
    return API.getList(symbols, selected, selectedIndex)
  }

  getColumns(){
    const { selected } = this.props
    let columns = [null]
    selected.map( (v, i) => {
      columns.push(i)
    })
    return columns;
  }


  renderColumns(){
    const columns = this.getColumns()

    return (
      columns.map((selectedIndex, columnIndex) => {
        const list = this.getList(selectedIndex);
        if(list){
          return (
            <Column list={list} className={'column'} ref={'column'+columnIndex} columnIndex={columnIndex} key={columnIndex} />
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

const AppComponentWithData = connect(mapStateToProps, {})(AppComponent)
export default DragDropContext(HTML5Backend)(AppComponentWithData)
