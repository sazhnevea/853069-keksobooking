'use strict';
(function () {
  window.addPinsToDom = function () {
    window.utils.pinListElement.appendChild(window.utils.fragment);
  };

  var address = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select, fieldset');

  function removeDisabledAttr(element) {
    element.removeAttribute('disabled');
  }

  var hiddenInput = document.getElementById('address_hidden');
  hiddenInput.setAttribute('value', address.placeholder);

  window.activatePage = function () {
    adFormFieldset.forEach(removeDisabledAttr);
    mapFiltersSelect.forEach(removeDisabledAttr);
    window.utils.userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.placeholder = '590, 441';
    window.addPinsToDom();
  };
  address.placeholder = '590, 395';

  window.setPinLocationToAddress = function (index) {
    var coordinates = window.pins.pins[index].location.x + ', ' + window.pins.pins[index].location.y;
    address.placeholder = coordinates;
    hiddenInput.value = coordinates;
  };


  window.pageActivate = {
    address: address,
    adForm: adForm,
    hiddenInput: hiddenInput
  };
})();
