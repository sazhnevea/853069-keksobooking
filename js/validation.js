'use strict';
(function () {
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');

  var roomsMapDisabled = {
    1: [0, 1, 3],
    2: [3, 0],
    3: [3],
    100: [1, 2, 0]
  };

  var roomsMapSelected = {
    1: [2],
    2: [2],
    3: [2],
    100: [3]
  };
  var roomNumbersDisablesReset = [0, 1, 2, 3];

  function resetRoomNumbers() {
    roomNumbersDisablesReset.forEach(function (index) {
      capacity.children[index].removeAttribute('disabled', '');
      capacity.children[index].removeAttribute('selected', '');
    });
  }

  function setRoomNumbersValid(v) {
    roomsMapDisabled[v].forEach(function (index) {
      capacity.children[index].setAttribute('disabled', '');
    });
    roomsMapSelected[v].forEach(function (index) {
      capacity.children[index].setAttribute('selected', '');
    });
  }

  roomNumber.addEventListener('change', function () {
    resetRoomNumbers();
    setRoomNumbersValid(roomNumber.value);
  });

  resetRoomNumbers();
  setRoomNumbersValid(roomNumber.value);

  var userTitleInput = document.getElementById('title');
  userTitleInput.addEventListener('invalid', function () {
    var message = '';
    if (userTitleInput.validity.tooShort) {
      message = 'Имя должно состоять минимум из 30-х символов';
    } else if (userTitleInput.validity.tooLong) {
      message = 'Имя не должно превышать 100-та символов';
    } else if (userTitleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    } else {
      message = '';
    }
    userTitleInput.setCustomValidity(message);
  });

  userTitleInput.addEventListener('input', function (evt) {
    var message = '';
    var target = evt.target;
    if (target.value.length < 30) {
      message = 'Имя должно состоять минимум из 30-х символов';
    } else if (target.value.length > 100) {
      message = 'Имя не должно превышать 100-та символов';
    } else if (userTitleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    } else {
      message = '';
    }
    target.setCustomValidity(message);
  });
})();
