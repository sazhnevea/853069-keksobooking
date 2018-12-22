'use strict';
(function () {

  // массив объектов меток
  var pinTemplate = document
                    .querySelector('#pin')
                    .content
                    .querySelector('.map__pin');
  var renderPin = function (pin, index) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('data-index', index);
    pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
    pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    pinElement.setAttribute('alt', pin.offer.title);
    return pinElement;
  };

  window.load(function (data) {
    var pins = data;
    pins.forEach(function (pin, index) {
      if (pin.hasOwnProperty('offer')) {
        window.domElements.fragment.appendChild(renderPin(pin, index));
      }
    });
  });

  function addPinsToDom() {
    window.domElements.pinListElement.appendChild(window.domElements.fragment);
  }

  function getClickedPin(evt) {
    var target = evt.target;
    var clickedTag = evt.target.tagName;
    if (clickedTag === 'IMG' || clickedTag === 'BUTTON') {
      if (clickedTag === 'IMG') {
        target = target.parentNode;
      }
      var dataIndex = target.getAttribute('data-index');
    }
    return dataIndex;
  }

  window.pins = {
    addPinsToDom: addPinsToDom,
    getClickedPin: getClickedPin
  };
})();
