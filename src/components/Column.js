import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import ItemTypes from '../contstants/ItemTypes'


const listItemTarget = {
  canDrop(props, monitor) {
  const { focusedItem, columnIndex } = props;
  const targetColumn = columnIndex;
  const itemColumn = focusedItem.length - 1;

  return ( targetColumn <= itemColumn )
 },
  drop(props, monitor, component) {
    console.log(props)
    return props
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Column extends Component {

  render(){
    const { className, children, connectDropTarget, isOver, canDrop } = this.props;

    let style = {
      backgroundColor: '#FFF'
    }

    if(isOver && canDrop){
      style.backgroundColor = '#F5F9FF'
    }

    return connectDropTarget(
      <div
        className = {className}
        style = {style}
      >
        {children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.LISTITEM, listItemTarget, collect)(Column);
