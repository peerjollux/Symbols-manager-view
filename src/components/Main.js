require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Symbols from '../sources/Symbols'
import ReactList from 'react-list';
import ListItem from './ListItem'
// import KeyboardEvents from '../actions/KeyboardEvents'
// import { selectNext } from '../actions/selecting'
import * as API from '../actions/api'


class AppComponent extends React.Component {

<<<<<<< HEAD
<<<<<<< HEAD
  /***********************
  **  STATE & VARIABLES **
  ***********************/
=======
  /* Set initial state */
>>>>>>> 7bf4f22... Fixed empty column bug
=======
  /* Set initial state */
>>>>>>> 7bf4f22... Fixed empty column bug
  state = {
    symbols: Symbols,
    selected: []
  }

<<<<<<< HEAD
<<<<<<< HEAD
  keyboardShortcuts = {
    down: () => this.selectNextItem(),
    up: () => this.test()
  }

  /******************************************
  **  CONNECTING EXTERNAL HELPER FUNCTIONS **
  ******************************************/
  renameItem() {
    return this.setState( () => API.renameItem(this.state) );
  }
=======
  /* Connectin API to helper functions */
  getList         = (props) => ( API.getList(this.state, props) )
  getColumns      = ()      => ( API.getColumns(this.state) )
>>>>>>> 7bf4f22... Fixed empty column bug

  selectListItem(props) {
    return this.setState(props);
  }

  isSelected(props) {
    return API.isSelected(this.state, props);
  }

  getItemByColumn(props) {
    return API.getItemByColumn(this.state, props);
  }
=======
  /* Connectin API to helper functions */
  getList         = (props) => ( API.getList(this.state, props) )
  getColumns      = ()      => ( API.getColumns(this.state) )
>>>>>>> 7bf4f22... Fixed empty column bug

  /* Local helper functions */
  selectListItem(props) {
    this.setState({selected: props.path});
  }

<<<<<<< HEAD
  /****************************
  ** RENDER HELPER FUNCTIONS **
  ****************************/
  renderListItem(rowIndex, key, columnIndex) {
    const item = this.getItemByColumn({ rowIndex, columnIndex });
    const isSelected = this.isSelected({ rowIndex, columnIndex });
=======
  /* Local helper functions */
  selectListItem(props) {
    this.setState({selected: props.path});
  }
>>>>>>> 7bf4f22... Fixed empty column bug

    if (item) {
      const { path } = item;
      const onClick = () => this.selectListItem({selected: path});
      return (
        <ListItem
          key = { key }
          onClick = { onClick }
          data = { item }
          selected = { isSelected }
        />
      );
    }
  }

  renderColumn(columnIndex, key) {
    return (
<<<<<<< HEAD
      <div key = {key} className = "columns-wrapper__column" >
        <ReactList
          itemRenderer = { (index, key) => this.renderListItem(index, key, columnIndex)}
          itemKey = { key }
          length = { 4 }
          type = 'uniform'
          />
      </div>
    );
=======
      columns.map( (selectedIndex, columnIndex) => {
        const listData = this.getList({selectedIndex: selectedIndex});
        const selectedItem = selected[columnIndex]
        return (
          this.renderColumn({
            list: listData,
            columnIndex: columnIndex,
            selectedItem: selectedItem
          })
        )
      })
    )
>>>>>>> 7bf4f22... Fixed empty column bug
  }

  renderColumn(props){
    const { selected } = this.state;
    const { list, selectedItem, columnIndex } = props;

    if(list){
      return (
        <div className='column' key={columnIndex}>
          { list.map( (item, rowIndex) => {
            const selected = (selectedItem === rowIndex)
            return (
              <ListItem
                data={item}
                key={rowIndex}
                selected={selected}
                onClick = {() => this.selectListItem({path: item.path })}
              />
            )
          })}
        </div>
      );
    }
  }

  renderColumn(props){
    const { selected } = this.state;
    const { list, selectedItem, columnIndex } = props;

    if(list){
      return (
        <div className='column' key={columnIndex}>
          { list.map( (item, rowIndex) => {
            const selected = (selectedItem === rowIndex)
            return (
              <ListItem
                data={item}
                key={rowIndex}
                selected={selected}
                onClick = {() => this.selectListItem({path: item.path })}
              />
            )
          })}
        </div>
      );
    }
  }

  render() {
<<<<<<< HEAD
<<<<<<< HEAD
    const {
      selected
    } = this.state;
    const columns = selected.length + 1;
=======
=======
>>>>>>> 7bf4f22... Fixed empty column bug

>>>>>>> 7bf4f22... Fixed empty column bug
    return (
      <div>
        <button onClick = { () => this.renameItem()} > rename < /button>
        <div className = "columns-wrapper" >
          <ReactList
            itemRenderer = {::this.renderColumn}
            length = { columns }
            axis = 'x'
            type = 'uniform'
          />
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
AppComponent.defaultProps = {};

=======
>>>>>>> 7bf4f22... Fixed empty column bug
=======
>>>>>>> 7bf4f22... Fixed empty column bug
export default AppComponent;
