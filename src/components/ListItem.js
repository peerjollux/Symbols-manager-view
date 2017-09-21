import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import ItemTypes from '../contstants/ItemTypes'

const listItemSource = {
  beginDrag: function(){
    return {};
  }
}

function collect(connect, monitor) {
  return(
    {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  )
}

class ListItem extends Component {


  render(){
    const {
      data,
      selected,
      onClick,
      onMouseDown,
      connectDragSource,
      isDragging
    } = this.props;
    const { type, name } = data;

    // Setting the className
    let classNames = ['listItem']

    if(type){
      classNames.push('listItem--'+type);
    }

    if(selected){
      classNames.push('listItem--selected');
    }

    classNames = classNames.join(' ');

    return connectDragSource(
      <div
        className={classNames}
        onClick = {onClick}
        onMouseDown = {onMouseDown}

        style={{
          opacity: isDragging ? 0.9 : 1,
        }}
      >
        {name}
      </div>
    );
  }
}

export default DragSource(ItemTypes.LISTITEM, listItemSource, collect)(ListItem);
