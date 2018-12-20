'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select, fieldset');

  function removeDisabledAttr(element) {
    element.removeAttribute('disabled');
  }

  window.activatePage = function () {
    adFormFieldset.forEach(removeDisabledAttr);
    mapFiltersSelect.forEach(removeDisabledAttr);
    window.utils.userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.address.placeholder = '590, 441';
    window.addPinsToDom();
  };

  window.utils.mainPin.addEventListener('click', window.activatePage);

  window.pageActivate = {
    adForm: adForm,
  };
})();
