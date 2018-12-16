'use strict';
(function () {
  window.closeOpenedCard = function () {
    var closeCard = document.querySelector('.map__card');
    if (closeCard) {
      closeCard.remove();
    }
  };

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === window.const.ESC_KEYCODE) {
      window.closeOpenedCard();
    }
  };
})();
