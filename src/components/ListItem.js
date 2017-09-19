import React from 'react'

const ListItem = props => {

  const { data, itemKey, selected, onClick } = props;
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


  return (
    <div
      key={itemKey}
      className={classNames}
      onClick = {onClick}
    >
      {name}
    </div>
  );
}


export default ListItem;
