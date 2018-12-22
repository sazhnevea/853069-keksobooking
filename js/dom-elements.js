'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var pinListElement = userDialog.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var address = document.querySelector('#address');
  var hiddenInput = document.getElementById('address_hidden');
  var mainPin = document.querySelector('.map__pin--main');

  var cardTemplate = document
                    .querySelector('#card')
                    .content
                    .querySelector('.map__card');


  window.domElements = {
    userDialog: userDialog,
    fragment: fragment,
    cardTemplate: cardTemplate,
    address: address,
    hiddenInput: hiddenInput,
    pinListElement: pinListElement,
    mainPin: mainPin
  };
})();
