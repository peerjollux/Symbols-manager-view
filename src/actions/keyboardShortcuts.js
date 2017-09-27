const resolvePath = require('object-resolve-path');
import store from '../stores'
import _ from 'underscore'

const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13
}

const selectItemUp = () => {

}

const selectItemDown = () => {

}

const selectParent = () => {
  const state = store.getState()
  const { selected } = state.SelectionReducer;

  if(selected.length < 0){
    selected.slice[0, selected.length]
  }
}

const selectChild = () => {


}

const KeyboardShortcuts = ({left, down}) => {

  addEvent(document, 'keydown', function (e) {
      e = e || window.event;

      switch (e.keyCode) {
        case keyCodes.left:
          return left()
          break;
        case keyCodes.up:
          up();
          break;
        case keyCodes.right:
          right();
          break;
        case keyCodes.down:
          console.log('test keydown')
          break;
        case keyCodes.enter:
          enter();
          break;
        default:

      }
  });

  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, callback);
    } else {
      element['on' + eventName] = callback;
    }
  }
}

export default KeyboardShortcuts
