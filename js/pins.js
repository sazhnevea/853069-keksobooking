'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
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

  window.load(function (pins) {
    window.pinsData = pins;
    pins.forEach(function (pin, index) {
      if (pin.hasOwnProperty('offer')) {
        window.domElements.fragment.appendChild(renderPin(pin, index));
      }
    });
  }, function () {
    window.form.showErrorAd();
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

  function getPinCoordinates(index) {
    window.load(function (data) {
      return data[index].location.x + ', ' + data[index].location.y;
    });
  }

  window.pins = {
    addPinsToDom: addPinsToDom,
    getClickedPin: getClickedPin,
    mainPin: mainPin,
    getPinCoordinates: getPinCoordinates
  };
})();
