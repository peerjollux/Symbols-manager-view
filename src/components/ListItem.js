import React from 'react'


const ListItem = props => {

  const { data, itemKey, onClick } = props;
  const { type, name } = data;

  // Setting the className
  let classNames = ['listItem']

  if(type){
    classNames.push('listItem--'+type);
  }

  classNames = classNames.join(' ');

  return (
    <div
      key={itemKey}
      onClick={onClick}
      className={classNames}
    >
      {name}
    </div>
  );
}


export default ListItem;
