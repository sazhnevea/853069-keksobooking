'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var pinListElement = userDialog.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.domElements = {
    userDialog: userDialog,
    fragment: fragment,
    pinListElement: pinListElement
  };
})();
