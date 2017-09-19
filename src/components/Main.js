require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom'
import Dragula from 'react-dragula'
import Symbols from '../sources/Symbols'
import ListItem from './ListItem'
import * as API from '../actions/api'
const resolvePath = require('object-resolve-path');

class AppComponent extends React.Component {

  /* Set initial state */
  state = {
    symbols: Symbols,
    selected: []
  }

  focusedItem = null;

  /* Connectin API to helper functions */
  getList         = (props) => ( API.getList(this.state, props) )
  getColumns      = ()      => ( API.getColumns(this.state) )


  selectListItem(props) {
    this.setState({selected: props.path});
  }

  setFocusedItem(props){
    this.focusedItem = props.path
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

  componentDidUpdate(){
    let containers = [];
    const columns = this.getColumns();

    columns.map( (v, i) => {
      const column = resolvePath(this.refs, 'column'+i)
      containers.push(ReactDOM.findDOMNode(column));
    })


    let options = {
      isContainer: function (el) {
      },
      accepts: function(el, target, source, sibling) {


        if(target.className != 'column') {
          return false
        }

        if(target == source) {
          return false
        }

        console.log(this.focusedItem)
        return true
      },
    };

    const drake = Dragula(containers, options);

  }

  renderColumn(props){
    const { selected } = this.state;
    const { list, selectedItem, columnIndex } = props;

    if(list){
      return (
        <div className={'column'} ref={'column'+columnIndex} key={columnIndex} >
          { list.map( (item, rowIndex) => {
            const selected = (selectedItem === rowIndex)
            return (
              <ListItem
                data={item}
                key={rowIndex}
                selected={selected}
                onClick = { () => this.selectListItem({path: item.path }) }
                onMouseDown = { () => this.setFocusedItem({path: item.path }) }
              />
            )
          })}
        </div>
      );
    }
  }

  dragulaDecorator(componentBackingInstance){

    if (componentBackingInstance) {
      let options = {
        direction: 'horizontal'
      };

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
