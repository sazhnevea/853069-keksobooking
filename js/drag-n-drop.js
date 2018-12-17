'use strict';
(function () {
  var mainPin = window.utils.userDialog.querySelector('.map__pin--main');

  var limits = {
    top: 130,
    right: 1350,
    bottom: 630,
    left: 190
  };

  var dragState = {
    startCoords: {
      x: 0,
      y: 0
    },
    dragged: false
  };

  function isOnTheBorder(moveEvt, value) {
    var isOnTheBottom = moveEvt.clientY > value.bottom;
    var isOnTheTop = moveEvt.clientY < value.top;
    var isOnTheRight = moveEvt.clientX > value.right;
    var isOnTheLeft = moveEvt.clientX < value.left;
    return isOnTheBottom
        || isOnTheTop
        || isOnTheRight
        || isOnTheLeft;
  }

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    dragState.dragged = true;
    if (isOnTheBorder(moveEvt, limits)) {
      return;
    }

    var shift = {
      x: dragState.startCoords.x - moveEvt.clientX,
      y: dragState.startCoords.y - moveEvt.clientY
    };

    dragState.startCoords.x = moveEvt.clientX;
    dragState.startCoords.y = moveEvt.clientY;

    var changedCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    mainPin.style.top = changedCoords.y + 'px';
    mainPin.style.left = changedCoords.x + 'px';

    var newCoords = (changedCoords.x + 31) + ', ' + (changedCoords.y + 84);
    window.pageActivate.address.placeholder = newCoords;
    window.pageActivate.hiddenInput.value = newCoords;
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragState.dragged) {
      var onClickPreventDefault = function (draggedEvt) {
        draggedEvt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }
  }

  mainPin.addEventListener('mousedown', function (evt) {
    window.activatePage();
    evt.preventDefault();

    dragState.startCoords.x = evt.clientX;
    dragState.startCoords.y = evt.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
