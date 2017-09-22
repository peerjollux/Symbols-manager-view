import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../contstants/ItemTypes'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import _ from 'underscore'
import * as API from '../actions/api'
import {
  selectItem,
  clickItem
} from '../actions';


function checkIfChild(array, target, targetColumn){

	let	newTarget = _.first(target, targetColumn)
  let newArray = _.first(array, targetColumn)

  if(array.length > target.length){
    return false
  }

  if(newArray.length < newTarget.length){
    newTarget = _.first(target, newArray.length)
  }

  if(newArray.length !== newTarget.length){
    return false
  }

	for(var i = newArray.length; i--;) {
    if(newArray[i] !== newTarget[i]){
      return false;
    }
  }
  return true
}

const listItemTarget = {
  canDrop(props) {
    let { columnIndex } = props
    let { lastClicked, selected } = props.state
    let target = selected;
    let targetColumn = columnIndex;
    let item = lastClicked;
    let itemColumn = item.length - 1;

    if(targetColumn < itemColumn){
      return true
    }
    if(checkIfChild(item, target, targetColumn)){
      return false
    }
    // Item can't be droppen in the column
    if(targetColumn == itemColumn){
      return false
    }

    return true
  },
  drop(props, monitor, component) {
    console.log(props, monitor, component)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Column extends Component {
  selectListItem(props) {
    return this.props.selectItem(props)
  }

  setFocusedItem(props){
    return this.props.clickItem(props)
  }

  isSelected(rowIndex, columnIndex){
    const { selected } = this.props
    return API.isSelected(selected, rowIndex, columnIndex)
  }

  renderListItems(){
    const { list, columnIndex } = this.props
    return (
      list.map((item, rowIndex) => {

        const isSelected = this.isSelected(rowIndex, columnIndex);

        return (
          <ListItem
            data = {item}
            key = {rowIndex}
            selected = {isSelected}
            onClick = { () => this.selectListItem(item.path )}
            onMouseDown = { () => this.setFocusedItem(item.path)}
          />
        )
      })
    )
  }

  render(){
    const {
      className,
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    // Change background color on drag 'n drop hover
    let backgroundColor = '#FFF'
    if(isOver && canDrop){
      backgroundColor = '#F5F9FF'
    }

    return connectDropTarget(
      <div className={className} style={{ backgroundColor }}>
        { this.renderListItems() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    symbols: state.SymbolsReducer.symbols,
    selected: state.SelectionReducer.selected
  }
};

const ColumnWithData = connect(mapStateToProps, { selectItem, clickItem })(Column)
export default DropTarget(ItemTypes.LISTITEM, listItemTarget, collect)(ColumnWithData);
