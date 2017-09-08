require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';
import ListItem from './ListItem'


class AppComponent extends React.Component {
  state = {
    symbols: Symbols,
    selected: []
  }

  constructor(props){
    super(props);
    this.getListItemPath = this.getListItemPath.bind(this);
  }

  /**
  * selectListItem() sets state.selected to the provided path
  */
  selectListItem(itemPath, type) {
    this.setState({selected: itemPath});
  }

  /**
  * selectListItem() returns a boolean
  * to show if the listItem is selected yes or no.
  */
  isSelected(index, columnIndex) {
    const { selected } = this.state;

    if(index == selected[columnIndex]){
      return true;
    }
    return false;
  }

  /**
   * getListItemPath() returns a array with indexes.
   * This array is the path in the symbols object.
   */
  getListItemPath(index, columnIndex){
    let { selected } = this.state;
    let itemPath = [];
    for(var i=0; i<=columnIndex - 1; i++){
      itemPath.push(selected[i])
    }
    itemPath.push(index)
    return itemPath;
  }

  /**
   * getList() returns a array of listItem objects
   */
  getList(columnIndex) {
    let { selected, symbols } = this.state;
    let selectedList = symbols;
    let columns = selected.length + 1;

    if(columnIndex > 0 && columnIndex <= columns){
      for(var i=0; i<columnIndex && i< columns; i++){
        const id = selected[i]
        const type = selectedList[id].type;

        // Return array of various symbols objects
        if(type=='folder'){
          selectedList = selectedList[id].children;
        }

        // Return array with one symbol object
        if(type=='symbol'){
          selectedList = [selectedList[id]];
        }

        // Return empty list if the second last item a symbol. Otherwise the list keeps expanding.
        if(type=='symbol' && columns - 2 == i){
          selectedList = [];
        }

      }
    }

    return selectedList;
  }

  /**
   * getListItem() returns a object of a listItem
   */
  getListItem(index, columnIndex) {
    const list = this.getList(columnIndex);
    const listItem = list[index];
    if(listItem) {
      listItem.path = this.getListItemPath(index, columnIndex); //Add item path to Item object
    }

    return listItem;
  }

  /**
  * Renders list
  */
  renderList(columnIndex, key){
    return (
      <ReactList
        itemRenderer={(index, key) => this.renderListItem(index, key, columnIndex)}
        itemKey= {key}
        length={4}
        type='uniform'
      />
    );
  }

  /**
  * Function to get a right objects array for right column.
  */
  renderListItem(index, key, columnIndex) {
    const item = this.getListItem(index, columnIndex);
    const isSelected = this.isSelected(index, columnIndex);

    if(item){
      const onClick = () => this.selectListItem(item.path, item.type);

      return <ListItem key={key} onClick={onClick} data={item} selected={isSelected}/>;
    }
  }

  /**
  * Renders columns
  */
  renderColumn(columnIndex, key) {
    return (
      <div key={key} className="columns-wrapper__column">
        { this.renderList(columnIndex) }
      </div>
    );
  }

  render() {
    const { selected } = this.state;
    const columns = selected.length + 1;
    return (
      <div>
        <div className="columns-wrapper">
          <ReactList
            itemRenderer={::this.renderColumn}
            length={columns}
            axis='x'
            type='uniform'
          />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
