const KeyboardEvents = props => {
  const { left, up, right, down, enter } = props;

  const keyCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13
  }


  addEvent(document, 'keydown', function (e) {
      e = e || window.event;

      switch (e.keyCode) {
        case keyCodes.left:
          left();
          break;
        case keyCodes.up:
          up();
          break;
        case keyCodes.right:
          right();
          break;
        case keyCodes.down:
          down();
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

export default KeyboardEvents;
