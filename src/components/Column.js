import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import ItemTypes from '../contstants/ItemTypes'


const listItemTarget = {
  canDrop(props, monitor, component) {
   console.log(props.columnIndex)
 },
  drop(props, monitor, component) {

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
    const { className, children, connectDropTarget, isOver } = this.props;

    let backgroundColor = '#FFF'
    if(isOver){
      backgroundColor = '#F5F9FF'
    }

    return connectDropTarget(
      <div
        className={className}
        style={{
          backgroundColor
        }}
      >
        {children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.LISTITEM, listItemTarget, collect)(Column);
