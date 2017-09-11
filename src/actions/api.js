const resolvePath = require('object-resolve-path');

/**
 * getListItem() returns a object of a listItem
 */

export const getList = (state, props) => {

  const { symbols, selected } = state;
  const { columnIndex } = props;
  let selectedList = symbols;

  if(columnIndex > 0 && columnIndex <= selected.length){
   for(var i=0; i<columnIndex && i<selected.length; i++){
     const id = selected[i]
     if(selectedList[id].hasOwnProperty('children')){
       selectedList = selectedList[id].children;
     } else {
       selectedList = [ selectedList[id] ];
     }
   }
  } else if (columnIndex >= selected.length && columnIndex != 0) {
   selectedList = '';
  }
  return selectedList;
}


export const getItemByColumn = (state, props) => {
  const { index, columnIndex } = props;
  const list = getList(state, props);
  const listItem = list[index];
  if(listItem) {
    listItem.path = getListItemPath(state, props); //Add item path to Item object
  }
  return listItem;
}


export const getItemById = (state, props) => {
  const { symbols } = state;
  const { itemPath } = props;

  let selectedList = symbols;

  if( itemPath.length != 0){
    let count = 0;

    for (var id of itemPath) {
      count++
      selectedList = selectedList[id]

      if(count < itemPath.length) {
        selectedList = selectedList.children
      }
    }
    return selectedList;
  }

  return false;
}

/**
 * getListItemPath() returns a array with indexes.
 * This array is the path in the symbols object.
 */
export const getListItemPath = (state, props) => {
  const { selected } = state;
  const { index, columnIndex } = props;

  let itemPath = [];
  for(var i=0; i<=columnIndex - 1; i++){
    itemPath.push(selected[i])
  }
  itemPath.push(index)

  return itemPath;
}


export const renameItem = (state, props) => {
  const { selected } = state;
  const selectedItem = getSelectedItem(state)

  var name = prompt('Enter new title', selectedItem.name);

  if (name != null) {
    saveItem(state, {itemPath: selected, name})
  }
}

/**
 * getListItemPath() returns a array with indexes.
 * This array is the path in the symbols object.
 */
export const isSelected = (state, props) => {
  const { selected } = state;
  const { index, columnIndex } = props;

  if(index == selected[columnIndex]){
    return true;
  }
  return false;
}

export const getSelectedItem = (state) => {
  const { selected } = state;
  const selectedItem = getItemById(state, {itemPath: selected});
  return selectedItem;
}

export const saveItem = (state, props) => {
  const { symbols } = state;
  const { itemPath, name } = props;


  let symbolsPath = '';

  if( itemPath.length != 0){
    let count = 0;

    for (var id of itemPath) {
      count++
      symbolsPath += '['+id+']';

      if(count < itemPath.length) {
        symbolsPath += ['.children']
      }
    }

    const item = resolvePath(symbols, symbolsPath);
    item.name = name;

    return state;
  }
}
