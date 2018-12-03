// Файл setup.js
'use strict';

var AD_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AD_CHECKIN = ['12:00', '13:00', '14:00'];
var AD_CHECKOUT = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PINS_COUNTER = 8;

// генератор случайного числа в заданном диапазоне
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

// генератор массива случайных чисел в заданном диапазоне
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
  offerContent.address = location.x + ', ' + location.y; // в индекс.хтмл в строчке, куда добавляю эти значения адрем написан текстом, но по заданию сюда нужно поставить число. не логично как-то
  offerContent.price = getRandomNumber(1000, 1000000);
  offerContent.type = AD_TYPE[getRandomNumber(0, AD_TYPE.length - 1)];
  offerContent.rooms = getRandomNumber(1, 5);
  offerContent.guests = getRandomNumber(1, 10);
  offerContent.checkin = AD_CHECKIN[getRandomNumber(0, AD_CHECKIN.length - 1)];
  offerContent.checkout = AD_CHECKOUT[getRandomNumber(0, AD_CHECKOUT.length - 1)];
  var features = [];
  for (var i = 0; i < getRandomNumber(0, AD_FEATURES.length - 1); i++) {
    features.push(AD_FEATURES[i]);
  }
  offerContent.features = features;
  offerContent.description = '';
  var orderOfPhoto = generateArrayRandomNumber(0, AD_PHOTOS.length - 1);
  var photos = [];
  for (var j = 0; j < AD_PHOTOS.length; j++) {
    photos.push(AD_PHOTOS[orderOfPhoto[j]]);
  }
  offerContent.photos = photos;
  return offerContent;
};

var getLocationContent = function () {
  var locationContent = {};
  locationContent.x = getRandomNumber(130, 630) - 20;
  locationContent.y = getRandomNumber(130, 630) - 40;
  return locationContent;
};

var getSimularAd = function (title) {
  var simularAd = {};
  simularAd.author = getAuthorContent();
  simularAd.offer = getOfferContent(title);
  simularAd.location = getLocationContent();
  return simularAd;
};

// функция создания массива объектов меток
var getArrayOfPins = function (counter) {
  var arrayOfPins = [];
  for (var i = 0; i < counter; i++) {
    arrayOfPins[i] = getSimularAd(AD_TITLE[i]);
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
for (var i = 0; i < arrayOfPins.length; i++) {
  fragment.appendChild(renderPin(arrayOfPins[i]));
}
pinListElement.appendChild(fragment);

// задание 5
var cardTemplate = document
                  .querySelector('#card')
                  .content
                  .querySelector('.map__card');

var renderCard = function (array) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = array.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = array.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = array.offer.price + '₽/ночь';
  if (array.offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  }
  if (array.offer.type === 'bungalo') {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  }
  if (array.offer.type === 'palace') {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  }
  if (array.offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  }
  cardElement.querySelector('.popup__text--capacity').textContent =
  array.offer.rooms + ' комнаты для ' + array.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent =
  'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = array.offer.features;
  cardElement.querySelector('.popup__description').textContent = array.offer.description;
  cardElement.querySelector('.popup__photo').setAttribute('src', array.offer.photos[0]);
  var img1 = cardElement.querySelector('.popup__photo').cloneNode(true);
  img1.setAttribute('src', array.offer.photos[1]);
  cardElement.querySelector('.popup__photos').appendChild(img1);
  var img2 = cardElement.querySelector('.popup__photo').cloneNode(true);
  img2.setAttribute('src', array.offer.photos[2]);
  cardElement.querySelector('.popup__photos').appendChild(img2);
  cardElement.querySelector('.popup__avatar').setAttribute('src', array.author.avatar);
  return cardElement;
};

var cardListElement = userDialog.querySelector('.map__pins');


var cards = document.createDocumentFragment();
for (var k = 0; k < arrayOfPins.length; k++) {
  cards.appendChild(renderCard(arrayOfPins[k]));
}
cardListElement.appendChild(cards);
