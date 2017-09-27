const resolvePath = require('object-resolve-path');
import _ from 'underscore'


const getParentPathString = (pathArray) => {
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

const getPathString = (pathArray) => {
  let symbolsPath = '';
  const pathLength = pathArray.length;

  if (pathLength != 0) {
    let count = 0;

    for (var id of pathArray) {
      count++
      if (count <= pathLength) {
        symbolsPath += '[' + id + ']';
        symbolsPath += ['.children']
      }
    }
  }

  return symbolsPath
}


export const moveItem = (symbols, selected, itemPath, targetColumn) => {
  let symbolsCopy = Object.assign([], symbols);
  const symbolsPath = getParentPathString(itemPath)

  const parentPath = resolvePath(symbolsCopy, symbolsPath)
  const lastIndex = itemPath[itemPath.length - 1]

  // Get item to move
  const item = parentPath[lastIndex]
  // Remove item from symbols list
  parentPath.splice(lastIndex, 1)

  //Define target path
  let targetPath = selected.slice(0, targetColumn)

  targetPath = getPathString(targetPath)
  targetPath = resolvePath(symbolsCopy, targetPath)

  // Add new item to array
  targetPath.push(item)

  // Create sorted copy of target column
  let sortedTarget = _.sortBy(targetPath, 'name')
  sortedTarget = _.sortBy(sortedTarget, 'type')

  // For some reason we can not directly do targetPath=sortedTarget
  // That's why we first empty the array and than push new sortedarray into it
  targetPath.length = 0
  targetPath.push(...sortedTarget)

  return symbolsCopy
}

/**
 * getList() returns a array of a item objects.
 */
export const getList = (state, props) => {
  const { symbols, selected } = state;
  const { selectedIndex } = props;

  let path = '';

  if(selectedIndex != null) {
    selected.map( (v, index) => {

      if(index <= selectedIndex && selectedIndex < selected.length ){
        path += '[' + v + ']';


        const tempList = resolvePath(symbols, path);
        if(tempList){
          if(tempList.hasOwnProperty('children')){
            path += '.children'
          }
        }
      }
    })
  }

  let list = resolvePath(symbols, path);

  // If last item in list is a symbol, we return an empty list
  if(list === undefined || list.length === undefined){
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

export const isSelected = (state, props) => {
  let { selected } = state;
  let { columnIndex, rowIndex } = props;

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


export const getItemPath = (state, props) => {

  let { selected } = state
  const { columnIndex, rowIndex } = props

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
