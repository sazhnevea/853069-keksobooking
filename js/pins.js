'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');

  var getAuthorContent = function (index) {
    var AuthorContent = {};
    AuthorContent.avatar = 'img/avatars/user0' + index + '.png';
    return AuthorContent;
  };
  var getLocationContent = function () {
    return {
      x: window.randoms.getRandomNumber(130, 630) - 20,
      y: window.randoms.getRandomNumber(130, 730) - 40
    };
  };

  var getOfferContent = function (title) {
    var offerContent = {};
    offerContent.title = title;
    var location = getLocationContent();
    offerContent.address = location.x + ', ' + location.y;
    offerContent.price = window.randoms.getRandomNumber(1000, 1000000);
    offerContent.type = window.randoms.getRandomElement(window.data.AD_TYPE);
    offerContent.rooms = window.randoms.getRandomNumber(1, 5);
    offerContent.guests = window.randoms.getRandomNumber(1, 10);
    offerContent.checkin = window.randoms.getRandomElement(window.data.AD_CHECKIN);
    offerContent.checkout = window.randoms.getRandomElement(window.data.AD_CHECKOUT);
    var features = [];
    for (var i = 0; i < window.randoms.getRandomNumber(0, window.data.AD_FEATURES.length - 1); i++) {
      features.push(window.data.AD_FEATURES[i]);
    }
    offerContent.features = features;
    offerContent.description = '';
    var photoIndexes = window.randoms.generateArrayRandomNumber(0, window.data.AD_PHOTOS.length - 1);
    var photos = photoIndexes.map(function (photoIndex) {
      return window.data.AD_PHOTOS[photoIndex];
    });
    offerContent.photos = photos;
    return offerContent;
  };


  var getSimilarAd = function (title, index) {
    return {
      author: getAuthorContent(index),
      offer: getOfferContent(title),
      location: getLocationContent()
    };
  };

  function getPins(titles) {
    return titles.map(function (title, i) {
      return getSimilarAd(title, i + 1);
    });
  }


  // массив объектов меток
  var pins = getPins(window.data.AD_TITLE);
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

  pins.forEach(function (pin, index) {
    window.domElements.fragment.appendChild(renderPin(pin, index));
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
    return pins[index].location.x + ', ' + pins[index].location.y;
  }

  window.pins = {
    addPinsToDom: addPinsToDom,
    getClickedPin: getClickedPin,
    pins: pins,
    mainPin: mainPin,
    getPinCoordinates: getPinCoordinates
  };
})();
