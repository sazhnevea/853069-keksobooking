'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var pinListElement = userDialog.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var cardTemplate = document
                    .querySelector('#card')
                    .content
                    .querySelector('.map__card');


  window.utils = {
    userDialog: userDialog,
    fragment: fragment,
    cardTemplate: cardTemplate,
    pinListElement: pinListElement
  };
})();
