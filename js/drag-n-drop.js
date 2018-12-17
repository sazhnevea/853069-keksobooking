'use strict';
(function () {
  var mainPin = window.pins.userDialog.querySelector('.map__pin--main');
  var limits = {
    top: 130,
    right: 1350,
    bottom: 630,
    left: 190
  };

  // var setupDialogElement = document.querySelector('.setup');
  // var dialogHandler = setupDialogElement.querySelector('.upload');

  mainPin.addEventListener('mousedown', function (evt) {
    window.activatePage();
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      if (moveEvt.clientY > limits.bottom || moveEvt.clientY < limits.top) {
        return;
      }
      if (moveEvt.clientX > limits.right || moveEvt.clientX < limits.left) {
        return;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.changedCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      mainPin.style.top = window.changedCoords.y + 'px';
      mainPin.style.left = window.changedCoords.x + 'px';
      var newCoords = (window.changedCoords.x + 31) + ', ' + (window.changedCoords.y + 84);
      window.pageActivate.address.placeholder = newCoords;
      window.pageActivate.hiddenInput.value = newCoords;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
