const resolvePath = require('object-resolve-path');

/**
 * getList() returns a array of a item objects.
 */
export const getList = (state, props) => {
  const { symbols, selected } = state;
  const { columnIndex } = props;

<<<<<<< HEAD
  let symbolsPath = '';
  if ( columnIndex > 0) {

    for(var columns=0; columns < columnIndex && columns < selected.length; columns++ ){
      const id = selected[columns];
      symbolsPath += '[' + id + ']';
=======

  let path = '';

  if(selectedIndex != null) {
    selected.map( (v, index) => {

      if(index <= selectedIndex && selectedIndex < selected.length ){
        path += '[' + v + ']';
>>>>>>> 7bf4f22... Fixed empty column bug

      const temp = resolvePath(symbols, symbolsPath);
      if (temp.children) {
        symbolsPath += '.children';
      }
    }

    const list = resolvePath(symbols, symbolsPath);
    return list;
  }
<<<<<<< HEAD
  return symbols;
=======

  let list = resolvePath(symbols, path);
  if(list.length === undefined){
      // If last item in list is a symbol, we don;t show the last column
      list = null
  }
  return list;
>>>>>>> 7bf4f22... Fixed empty column bug
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
  const { selected } = state;
  const { rowIndex, columnIndex } = props;

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
