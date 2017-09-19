require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Dragula from 'react-dragula'
import Symbols from '../sources/Symbols'
import ListItem from './ListItem'
import * as API from '../actions/api'

class AppComponent extends React.Component {

  /* Set initial state */
  state = {
    symbols: Symbols,
    selected: []
  }

  /* Connectin API to helper functions */
  getList         = (props) => ( API.getList(this.state, props) )
  getColumns      = ()      => ( API.getColumns(this.state) )


  selectListItem(props) {
    this.setState({selected: props.path});
  }

  /* Render helper functions */
  renderColumns(){
    const columns = this.getColumns()
    const { selected } = this.state;
    return (
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
  }

  renderColumn(props){
    const { selected } = this.state;
    const { list, selectedItem, columnIndex } = props;

    if(list){
      return (
        <div className='column' key={columnIndex} ref={this.dragulaDecorator}>
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

  dragulaDecorator(componentBackingInstance){
    if (componentBackingInstance) {
      let options = { };
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    return (
      <div className='columns-wrapper'>
        { this.renderColumns() }
      </div>
    );
  }
}

export default AppComponent;
