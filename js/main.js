'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select, fieldset');

  function removeDisabledAttr(element) {
    element.removeAttribute('disabled');
  }

  function activatePage() {
    adFormFieldset.forEach(removeDisabledAttr);
    mapFiltersSelect.forEach(removeDisabledAttr);
    window.domElements.userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.setDefaultAddress();
    window.pins.addPinsToDom();
  }

  window.pins.mainPin.addEventListener('click', activatePage);

  window.pageActivate = {
    adForm: adForm,
  };
})();
