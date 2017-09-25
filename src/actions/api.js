const resolvePath = require('object-resolve-path');
import store from '../stores'



const getParentPath = (pathArray) => {
  let symbolsPath = '';
  const pathLength = pathArray.length;

  if (pathLength != 0) {
    let count = 0;

    for (var id of pathArray) {
      count++

      if (count < pathLength) {
        symbolsPath += '[' + id + ']';
        symbolsPath += ['.children']
      }
    }
  }
  return symbolsPath
}

export const moveItem = (symbols, selected, itemPath, targetColumn) => {
  const symbolsCopy = Object.assign([], symbols);
  const symbolsPath = getParentPath(itemPath)

  const parentPath = resolvePath(symbolsCopy, symbolsPath)
  const lastIndex = itemPath[itemPath.length - 1]

  // Get item to move
  const item = parentPath.slice(lastIndex, 1)

  // Remove item from symbols list
  parentPath.splice(lastIndex, 1)

  //Define target path
  let targetPath = selected.slice(0, targetColumn - 1)
  targetPath = getParentPath(targetPath)
  targetPath = resolvePath(symbolsCopy, targetPath)
  targetPath.push(item[0])

  return symbolsCopy
}

/**
 * getList() returns a array of a item objects.
 */
export const getList = (symbols, selected, selectedIndex) => {

  let path = '';

  if(selectedIndex != null) {
    selected.map( (v, index) => {

      if(index <= selectedIndex && selectedIndex < selected.length ){
        path += '[' + v + ']';

        const tempList = resolvePath(symbols, path);
        if(tempList.children){
          path += '.children'
        }
      }
    })
  }

  let list = resolvePath(symbols, path);
  if(list.length === undefined){
      // If last item in list is a symbol, we don;t show the last column
      list = null
  }
  return list;
}


export const getColumns = (state) => {
  const { selected } = state;
  let columns = [null]
  selected.map( (v, i) => {
    columns.push(i)
  })
  return columns;
}
/**
 * getItemByColumn() returns a item object.
 * Object can be found by proving a column- and row-index.
 */
export const getItemByColumn = (state, props) => {
  const { rowIndex } = props;
  const list = getList(state, props);
  const listItem = list[rowIndex];
  if (listItem) {
    listItem.path = getListItemPath(state, props); //Add item path to Item object
  }
  return listItem;
}

/**
 * getItemByColumn() returns a item object.
 * Object can be found by proving a column- and row-index.
 */
export const getItemById = (state, props) => {
  const { symbols } = state;
  const { itemPath } = props;

  let selectedList = symbols;

  if (itemPath.length != 0) {
    let count = 0;

    for (var id of itemPath) {
      count++
      selectedList = selectedList[id]

      if (count < itemPath.length) {
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
  const { rowIndex, columnIndex } = props;

  let itemPath = [];
  for (var i = 0; i <= columnIndex - 1; i++) {
    itemPath.push(selected[i])
  }
  itemPath.push(rowIndex)

  return itemPath;
}


export const renameItem = (state) => {
  const { selected } = state;
  const selectedItem = getSelectedItem(state)

  var name = prompt('Enter new title', selectedItem.name);

  if (name != null) {
    saveItem(state, {
      itemPath: selected,
      name
    })
  }
}

export const isSelected = (selected, rowIndex, columnIndex) => {

  if (rowIndex == selected[columnIndex]) {
    return true;
  }
  return false;
}

export const getSelectedItem = (state) => {
  const { selected } = state;
  const selectedItem = getItemById(state, { itemPath: selected });
  return selectedItem;
}

export const saveItem = (state, props) => {
  const { symbols } = state;
  const { itemPath, name } = props;


  let symbolsPath = '';

  if (itemPath.length != 0) {
    let count = 0;

    for (var id of itemPath) {
      count++
      symbolsPath += '[' + id + ']';

      if (count < itemPath.length) {
        symbolsPath += ['.children']
      }
    }

    const item = resolvePath(symbols, symbolsPath);
    item.name = name;

    return state;
  }
}


export const getItemPath = (columnIndex, rowIndex) => {
  let state = store.getState()
  let { selected } = state.SelectionReducer;

  let itemPath = []

  if(columnIndex > 0){
    itemPath = selected.slice(0, columnIndex)
  }

  itemPath.push(rowIndex);
  
  return itemPath
}


export const checkIfChild = (array, target, targetColumn) => {
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
