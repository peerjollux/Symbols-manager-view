import React from 'react'
import ListItem from './ListItem'

const Column = props => {

  const { list, selectedItem } = props;

  return (
    <div className='column'>
      { list.map( (item, rowIndex) => {
        const selected = (selectedItem === rowIndex)

        return (
          <ListItem data={item} key={rowIndex} selected={selected}/>
        )
      })}
    </div>
  );
}


export default Column;
