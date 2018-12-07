// Файл setup.js
'use strict';

var AD_TITLE = ['Большая уютная квартира',
  'Маленькая неуютная квартира', 'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKIN = ['12:00', '13:00', '14:00'];
var AD_CHECKOUT = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PINS_COUNTER = 8;

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
var getAuthorContent = function () {
  var AuthorContent = {};
  AuthorContent.avatar = 'img/avatars/user0' + getRandomNumber(1, 8) + '.png';
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
  offerContent.type = getRandomElement(AD_TYPE);
  offerContent.rooms = getRandomNumber(1, 5);
  offerContent.guests = getRandomNumber(1, 10);
  offerContent.checkin = getRandomElement(AD_CHECKIN);
  offerContent.checkout = getRandomElement(AD_CHECKOUT);

  var features = [];
  for (var i = 0; i < getRandomNumber(0, AD_FEATURES.length - 1); i++) {
    features.push(AD_FEATURES[i]);
  }
  offerContent.features = features;
  offerContent.description = '';
  var photoIndexes = generateArrayRandomNumber(0, AD_PHOTOS.length - 1);
  var photos = photoIndexes.map(function (photoIndex) {
    return AD_PHOTOS[photoIndex];
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

var getSimilarAd = function (title) {
  return {
    author: getAuthorContent(),
    offer: getOfferContent(title),
    location: getLocationContent()
  };
};

// функция создания массива объектов меток
var getArrayOfPins = function (counter) {
  var arrayOfPins = [];
  for (var i = 0; i < counter; i++) {
    arrayOfPins[i] = getSimilarAd(AD_TITLE[i]);
  }
  return arrayOfPins;
};

// массив объектов меток
var arrayOfPins = getArrayOfPins(PINS_COUNTER);
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
var pinListElement = userDialog.querySelector('.map__pins');
var pinTemplate = document
                  .querySelector('#pin')
                  .content
                  .querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;');
  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
  pinElement.setAttribute('alt', pin.offer.title);
  return pinElement;
};


var fragment = document.createDocumentFragment();
arrayOfPins.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});


pinListElement.appendChild(fragment);

// задание 5
var cardTemplate = document
                  .querySelector('#card')
                  .content
                  .querySelector('.map__card');
// функция определения типа жилья метки
var getPinType = function (offerType) {
  switch (offerType) {
    case 'flat': return 'Квартира';
    case 'bungalo': return 'Бунгало';
    case 'palace': return 'Дворец';
    case 'house': return 'Дом';
    default: throw new Error('Unregognized type of the offer');
  }
};

var renderCard = function (template, pin) {
  var cardElement = template.cloneNode(true);
  var offer = pin.offer;
  var author = pin.author;
  setTitle(cardElement, offer.title);
  setAddress(cardElement, offer.address);
  setPrice(cardElement, offer.price);
  setType(cardElement, offer.type);
  setCapacity(cardElement, offer.rooms, offer.guests);
  setTime(cardElement, offer.checkin, offer.checkout);
  setFeatures(cardElement, offer.features);
  setDescription(cardElement, offer.description);
  setPhotos(cardElement, offer.photos);
  setAvatar(cardElement, author.avatar);
  return cardElement;
};

function setTitle(cardElement, title) {
  var titleContext = cardElement.querySelector('.popup__title');
  titleContext.textContent = title;
}

function setAddress(cardElement, address) {
  var addressContext = cardElement.querySelector('.popup__text--address');
  addressContext.textContent = address;
}

function setPrice(cardElement, price) {
  var priceContext = cardElement.querySelector('.popup__text--price');
  priceContext.textContent = price + '₽/ночь';
}

function setType(cardElement, type) {
  var typeContext = cardElement.querySelector('.popup__type');
  typeContext.textContent = getPinType(type);
}

function setCapacity(cardElement, rooms, guests) {
  var capacityContext = cardElement.querySelector('.popup__text--capacity');
  capacityContext.textContent = rooms + ' комнаты для ' + guests + ' гостей.';
}

function setTime(cardElement, checkin, checkout) {
  var timeContext = cardElement.querySelector('.popup__text--time');
  timeContext.textContent = 'Заезд после ' + checkin + ', выезд до ' + checkout;
}

function setFeatures(cardElement, features) {
  var featuresContext = cardElement.querySelector('.popup__features');
  featuresContext.textContent = features;
}

function setDescription(cardElement, description) {
  var descriptionContext = cardElement.querySelector('.popup__description');
  descriptionContext.textContent = description;
}

function setPhotos(cardElement, photos) {
  var cardPhotosElements = cardElement.querySelector('.popup__photos');
  var cardPhotoElement = cardPhotosElements.querySelector('.popup__photo');
  cardPhotoElement.remove();
  for (var i = 0; i < photos.length; i++) {
    var photoElementToAppend = cardPhotoElement.cloneNode(true);
    photoElementToAppend.setAttribute('src', photos[i]);
    cardPhotosElements.appendChild(photoElementToAppend);
  }
}

function setAvatar(cardElement, avatar) {
  var avatarURL = cardElement.querySelector('.popup__avatar');
  avatarURL.setAttribute('src', avatar);
}

var cardListElement = userDialog.querySelector('.map__pins');
var cards = document.createDocumentFragment();

arrayOfPins.forEach(function (pin) {
  cards.appendChild(renderCard(cardTemplate, pin));
});

cardListElement.appendChild(cards);
