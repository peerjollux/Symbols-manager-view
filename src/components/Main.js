require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';



class AppComponent extends React.Component {
  state = {
    symbols: Symbols,
    selected: [1, 1]
  }

  constructor(props) {
    super(props);
    this.props = props;
    this.getSelectedList = this.getSelectedList.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  /**
  Sets state.select after clicking an item.
  */
  selectItem(index) {
    this.setState({selected: index})
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

        if(selectedList[i].hasOwnProperty('children')){
          selectedList = selectedList[i].children;
        } else {
          selectedList = [ selectedList[i] ];
        }
      }
    } else if (columnIndex >= selected.length) {
      selectedList = '';
    }
    return selectedList;
  }

  /**
  * Renders list of list-items
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
    if(source[index]){
      return <div key={key} onClick={() => this.selectItem(index)}>{source[index].name} on {columnIndex}</div>;
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
