import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../contstants/ItemTypes'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import * as API from '../actions/api'
import {
  selectItem,
  clickItem
} from '../actions';


const listItemTarget = {
  canDrop(props, monitor) {

 },
  drop(props, monitor, component) {

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
            onMouseDown = { () => this.setFocusedItem({path: item.path }) }
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
    } = this.props;

    // Change background color on drag 'n drop hover
    let backgroundColor = '#FFF'
    if(isOver){
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
    selected: state.SelectionReducer.selected,
  }
};

const ColumnWithData = connect(mapStateToProps, { selectItem, clickItem })(Column)
export default DropTarget(ItemTypes.LISTITEM, listItemTarget, collect)(ColumnWithData);
