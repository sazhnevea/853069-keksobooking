'use strict';
(function () {
  function getRandomElement(array) {
    var length = array.length;
    var randomIndex = getRandomNumber(length - 1);
    return array[randomIndex];
  }

  // генератор случайного числа в заданном диапазоне
  var getRandomNumber = function (min, max) {
    if (typeof max === 'undefined') {
      max = min;
      min = 0;
    }
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  };

  // TODO: refactor it
  function generateArrayRandomNumber(min, max) {
    var totalNumbers = max - min + 1;
    var arrayTotalNumbers = [];
    var arrayRandomNumbers = [];
    var tempRandomNumber;

    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + min);
    }

    while (arrayTotalNumbers.length) {
      tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
      arrayTotalNumbers.splice(tempRandomNumber, 1);
    }

    return arrayRandomNumbers;
  }


  // наполняем объявление содержимым
  var getAuthorContent = function (index) {
    var AuthorContent = {};
    AuthorContent.avatar = 'img/avatars/user0' + index + '.png';
    return AuthorContent;
  };

  var getOfferContent = function (title) {
    var offerContent = {};
    offerContent.title = title;
    var location = getLocationContent();
    // в индекс.хтмл в строчке, куда добавляю эти значения, адрес
    // написан текстом, но по заданию сюда нужно поставить число.
    // не логично как-то
    offerContent.address = location.x + ', ' + location.y;
    offerContent.price = getRandomNumber(1000, 1000000);
    offerContent.type = getRandomElement(window.data.AD_TYPE);
    offerContent.rooms = getRandomNumber(1, 5);
    offerContent.guests = getRandomNumber(1, 10);
    offerContent.checkin = getRandomElement(window.data.AD_CHECKIN);
    offerContent.checkout = getRandomElement(window.data.AD_CHECKOUT);
    var features = [];
    for (var i = 0; i < getRandomNumber(0, window.data.AD_FEATURES.length - 1); i++) {
      features.push(window.data.AD_FEATURES[i]);
    }
    offerContent.features = features;
    offerContent.description = '';
    var photoIndexes = generateArrayRandomNumber(0, window.data.AD_PHOTOS.length - 1);
    var photos = photoIndexes.map(function (photoIndex) {
      return window.data.AD_PHOTOS[photoIndex];
    });
    offerContent.photos = photos;
    return offerContent;
  };

  var getLocationContent = function () {
    return {
      x: getRandomNumber(130, 630) - 20,
      y: getRandomNumber(130, 730) - 40
    };
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
    window.utils.fragment.appendChild(renderPin(pin, index));
  });

  window.getClickedPin = function (evt) {
    var target = evt.target;
    var clickedTag = evt.target.tagName;
    if (clickedTag === 'IMG' || clickedTag === 'BUTTON') {
      if (clickedTag === 'IMG') {
        target = target.parentNode;
      }
      var dataIndex = target.getAttribute('data-index');
    }
    return dataIndex;
  };

  window.pins = {
    pins: pins
  };
})();
