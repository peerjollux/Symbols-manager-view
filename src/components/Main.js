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
    if(type == 'folder'){
      this.setState({selected: itemPath});
    }
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

  /**
   * getListItem() returns a object of a listItem
   */
  getListItem(index, columnIndex) {
    const list = this.getList(columnIndex);
    const listItem = list[index];

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
    const itemPath = this.getListItemPath(index, columnIndex);
    const onClick = () => this.selectListItem(itemPath, item.type);

    if(item){
      return <ListItem key={key} onClick={onClick} data={item}/>;
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
        <ListItem data={{name: 'test'}} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
