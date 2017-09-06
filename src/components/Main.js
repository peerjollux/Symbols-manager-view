require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';



class AppComponent extends React.Component {
  state = {
    symbols: Symbols,
    selected: []
  }

  constructor(props){
    super(props);
    this.getItemPath = this.getItemPath.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  /**
  Sets state.select after clicking an item.
  */
  selectItem(itemPath) {
    this.setState({selected: itemPath});
  }

  getItemPath(index, columnIndex){
    let { selected } = this.state;
    let itemPath = [];
    for(var i=0; i<=columnIndex - 1; i++){
      itemPath.push(selected[i])
    }
    itemPath.push(index)
    return itemPath;
  }

  /**
  Function to get a right objects array for right column.

  @return {array} Array of objects (See state.symbols)
  */
  getSelectedList(columnIndex) {
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
  * Renders list
  *
  * @param {number} columnIndex - Index provided by ReactList.
  * @param {number} key - Key provided by ReactList.
  * @return {jsx} ReactList component
  */
  renderList(columnIndex, key){
    return (
      <ReactList
        itemRenderer={(index, key) => this.renderListItem(index, key, columnIndex)}
        key= {key}
        length={this.state.symbols.length}
        type='uniform'
      />
    );
  }

  /**
  * Function to get a right objects array for right column.
  *
  * @param {number} index - Index provided by ReactList.
  * @param {number} key - Key provided by ReactList.
  * @param {number} columnIndex -   Index of current column.
  * @return {jsx} Div with list item.
  */
  renderListItem(index, key, columnIndex) {
    const source = this.getSelectedList(columnIndex);
    const itemPath = this.getItemPath(index, columnIndex);

    if(source[index]){
      return <div key={key} onClick={() => this.selectItem(itemPath)}>{source[index].name} on {columnIndex}</div>;
    }
  }

  /**
  * Renders columns
  *
  * @param {number} columnIndex - Index provided by ReactList.
  * @param {number} key - Key provided by ReactList.
  * @return {jsx} Div with column containing a new list
  */
  renderColumn(columnIndex, key) {
    return (
      <div key={key} className="item">
        { this.renderList(columnIndex) }
      </div>
    );
  }

  render() {
    console.log(this.state.selected);
    return (
      <div>
        <div className="axis-x">
          <ReactList
            itemRenderer={::this.renderColumn}
            length='4'
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
