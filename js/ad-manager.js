'use strict';
(function () {
  var price = window.pageActivate.adForm.querySelector('#price');

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

  var accomondationTypeList = document.querySelector('#type');

  function setMinPriceInput() {
    setMinPrice(getMinPrice(window.getPinType(accomondationTypeList.value)));
  }
  accomondationTypeList.addEventListener('change', function () {
    setMinPriceInput();
  });

  setMinPriceInput();

  var checkIn = document.getElementById('timein');
  var checkOut = document.getElementById('timeout');

  function checkInOutSwitcher(changedElement, elementToChange) {
    elementToChange.selectedIndex = changedElement.selectedIndex;
  }

  checkIn.addEventListener('change', function () {
    checkInOutSwitcher(checkIn, checkOut);
  });

  checkOut.addEventListener('change', function () {
    checkInOutSwitcher(checkOut, checkIn);
  });
})();
