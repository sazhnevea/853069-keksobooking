'use strict';
(function () {
  var map = document.querySelector('.map__overlay');
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;

  var limits = {
    top: 130,
    right: map.offsetWidth + map.offsetLeft - window.domElements.mainPin.offsetWidth,
    bottom: 630,
    left: map.offsetLeft
  };
  var dragState = {
    startCoords: {
      x: 0,
      y: 0
    },
    dragged: false
  };

  function isOnTheBorder(limit, value) {
    var isOnTheBottom = limit.y > value.bottom;
    var isOnTheTop = limit.y < value.top;
    var isOnTheRight = limit.x > value.right;
    var isOnTheLeft = limit.x < value.left;
    return isOnTheBottom
        || isOnTheTop
        || isOnTheRight
        || isOnTheLeft;
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    dragState.dragged = true;
    var shift = {
      x: dragState.startCoords.x - moveEvt.clientX,
      y: dragState.startCoords.y - moveEvt.clientY
    };

    dragState.startCoords.x = moveEvt.clientX;
    dragState.startCoords.y = moveEvt.clientY;

    var changedCoords = {
      x: window.domElements.mainPin.offsetLeft - shift.x,
      y: window.domElements.mainPin.offsetTop - shift.y
    };
    if (isOnTheBorder(changedCoords, limits)) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      return;
    }

    window.domElements.mainPin.style.top = changedCoords.y + 'px';
    window.domElements.mainPin.style.left = changedCoords.x + 'px';

    var newCoords = (changedCoords.x + MAIN_PIN_WIDTH / 2) + ', ' + (changedCoords.y + MAIN_PIN_HEIGHT);
    window.domElements.address.placeholder = newCoords;
    window.domElements.hiddenInput.value = newCoords;
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragState.dragged) {
      var onClickPreventDefault = function (draggedEvt) {
        draggedEvt.preventDefault();
        window.domElements.mainPin.removeEventListener('click', onClickPreventDefault);
      };
      window.domElements.mainPin.addEventListener('click', onClickPreventDefault);
    }
  }

  window.domElements.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    dragState.startCoords.x = evt.clientX;
    dragState.startCoords.y = evt.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
