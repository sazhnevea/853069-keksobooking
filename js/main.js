'use strict';
var cardTemplate = document
                    .querySelector('#card')
                    .content
                    .querySelector('.map__card');

// задание 5
var userDialog = document.querySelector('.map');
var cardListElement = userDialog.querySelector('.map__pins');
var cards = document.createDocumentFragment();

var addCardToDom = function (card) {
  return cards.appendChild(window.renderCard(cardTemplate, card));
};

document.addEventListener('keydown', window.onPopupEscPress);

window.pins.pinListElement.onclick = function (evt) {
  window.closeOpenedCard();
  var dataIndex = window.getClickedPin(evt);
  if (dataIndex) {
    addCardToDom(window.pins.pins[dataIndex]);
    cardListElement.appendChild(cards);
    window.setPinLocationToAddress(dataIndex);
  }
};
