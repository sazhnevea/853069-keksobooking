'use strict';
(function () {
  var userTitleInput = document.getElementById('title');
  var price = window.pageActivate.adForm.querySelector('#price');
  var accomondationTypeList = document.querySelector('#type');
  var checkIn = document.getElementById('timein');
  var checkOut = document.getElementById('timeout');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var defaultCoords = '590, 395';
  var address = document.querySelector('#address');
  var hiddenInput = document.getElementById('address_hidden');
  var description = document.getElementById('description');
  var descriptionDefault = description.placeholder;
  var features = document
                 .getElementById('features');
  var checkboxes = features.querySelectorAll('input');
  // var error = document.getElementById('error');

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

  function setMinPrice(value) {
    price.setAttribute('min', value);
    price.setAttribute('placeholder', value);
  }

  var getMinPrice = function (type) {
    switch (type) {
      case 'Квартира': return '1000';
      case 'Бунгало': return '0';
      case 'Дворец': return '10000';
      case 'Дом': return '5000';
      default: throw new Error('Unrecognized type of the type');
    }
  };

  function setMinPriceInput() {
    setMinPrice(getMinPrice(window.cards.getApartmentType(accomondationTypeList.value)));
  }
  accomondationTypeList.addEventListener('change', function () {
    setMinPriceInput();
  });

  setMinPriceInput();

  function checkInOutSwitcher(changedElement, elementToChange) {
    elementToChange.selectedIndex = changedElement.selectedIndex;
  }

  function checkInOutSwitcherDefault(elementOne, elementTwo) {
    elementOne.selectedIndex = '0';
    elementTwo.selectedIndex = '0';
  }

  checkIn.addEventListener('change', function () {
    checkInOutSwitcher(checkIn, checkOut);
  });

  checkOut.addEventListener('change', function () {
    checkInOutSwitcher(checkOut, checkIn);
  });

  function resetRoomGuestsValue() {
    roomNumbersDisablesReset.forEach(function (index) {
      capacity.children[index].removeAttribute('disabled', '');
      capacity.children[index].removeAttribute('selected', '');
    });
  }

  function setRoomNumbersValidation(v) {
    roomsMapDisabled[v].forEach(function (index) {
      capacity.children[index].setAttribute('disabled', '');
    });
    roomsMapSelected[v].forEach(function (index) {
      capacity.children[index].setAttribute('selected', '');
    });
  }

  roomNumber.addEventListener('change', function () {
    resetRoomGuestsValue();
    setRoomNumbersValidation(roomNumber.value);
  });

  resetRoomGuestsValue();
  setRoomNumbersValidation(roomNumber.value);



  function setCheckboxDefault (elements) {
    checkboxes.forEach(function (element) {
      if (element.checked) {
        element.checked = false;
      }
    });
  }

  window.formDefaultValues = {
    title: userTitleInput.value,
    minPrice: price.value,
    apartmentTypeValue: accomondationTypeList.selectedIndex,
    roomNumberIndex: roomNumber.selectedIndex,
    capacity: capacity.selectedIndex
  };

  function setFormDefaultValues(formDefaultValues) {
    userTitleInput.value = formDefaultValues.title;
    price.value = formDefaultValues.minPrice;
    accomondationTypeList.selectedIndex = formDefaultValues.apartmentTypeValue;
    roomNumber.selectedIndex = formDefaultValues.roomNumberIndex;
    capacity.selectedIndex = formDefaultValues.capacity;
    description.value = '';
    description.placeholder = descriptionDefault;
    setDefaultAddress();
    checkInOutSwitcherDefault(checkIn, checkOut);
    setCheckboxDefault(checkboxes);
  }

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
      message = 'Имя должно состоять минимум из 1000-х символов';
    } else if (target.value.length > 100) {
      message = 'Имя не должно превышать 100-та символов';
    } else if (userTitleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    } else {
      message = '';
    }
    target.setCustomValidity(message);
  });

  function setAddress(coords) {
    address.placeholder = coords;
    hiddenInput.value = coords;
  }
  function setDefaultAddress() {
    setAddress(defaultCoords);
  }

  function setPinLocationToForm(index) {
    setAddress(window.pins.getPinCoordinates(index));
  }

  window.form = {
    setPinLocationToForm: setPinLocationToForm,
    defaultCoords: defaultCoords,
    setAddress: setAddress,
    setDefaultAddress: setDefaultAddress,
    setFormDefaultValues: setFormDefaultValues
  };

})();
