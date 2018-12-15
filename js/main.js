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
var pins = getPins(AD_TITLE);
var userDialog = document.querySelector('.map');
var pinListElement = userDialog.querySelector('.map__pins');
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

var fragment = document.createDocumentFragment();
pins.forEach(function (pin, index) {
  fragment.appendChild(renderPin(pin, index));
});

function addPinsToDom() {
  pinListElement.appendChild(fragment);
}

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
  function removeCard() {
    cardElement.removeEventListener('click', removeCard);
    cardElement.remove();
  }
  var cardElement = template.cloneNode(true);
  var offer = pin.offer;
  var author = pin.author;
  cardElement.querySelector('.popup__close').addEventListener('click', removeCard);
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

var cardListElement = userDialog.querySelector('.map__pins');
var cards = document.createDocumentFragment();

var getCardToDom = function (card) {
  return cards.appendChild(renderCard(cardTemplate, card));
};
cardListElement.appendChild(cards);

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

var address = document.querySelector('#address');
address.placeholder = '590, 395';



// задание 16.1

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersSelect = mapFilters.querySelectorAll('select, fieldset');

function removeDisabledAttr(element) {
  element.removeAttribute('disabled');
}

var mainPin = userDialog.querySelector('.map__pin--main');

function addAddressHiddenInput() {
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('value', address.placeholder);
  hiddenInput.setAttribute('name', 'address');
  address.parentNode.appendChild(hiddenInput);
}

function removeAddressVilibleAttr() {
  address.removeAttribute('name');
}

function activatePage() {
  adFormFieldset.forEach(removeDisabledAttr);
  mapFiltersSelect.forEach(removeDisabledAttr);
  userDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  address.placeholder = '590, 441';
  addPinsToDom();
  address.setAttribute('disabled', '');
  removeAddressVilibleAttr();
  addAddressHiddenInput();
}

mainPin.addEventListener('mouseup', function () {
  activatePage();
});

var ESC_KEYCODE = 27;

var closeOpenedCard = function () {
  var closeCard = document.querySelector('.map__card');
  if (closeCard) {
    closeCard.remove();
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeOpenedCard();
  }
};

document.addEventListener('keydown', onPopupEscPress);

var getClickedPin = function (evt) {
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

function setPinLocationToAddress(index) {
  address.placeholder = pins[index].location.x + ', ' + pins[index].location.y;
}

pinListElement.onclick = function (evt) {
  closeOpenedCard();
  var dataIndex = getClickedPin(evt);
  if (dataIndex) {
    getCardToDom(pins[dataIndex]);
    cardListElement.appendChild(cards);
    setPinLocationToAddress(dataIndex);
  }
};

// Задание 17
var price = adForm.querySelector('#price');

function setMinPrice(value) {
  price.setAttribute('min', value);
  price.setAttribute('placeholder', value);
}

var getMinPrice = function (type) {
  switch (type) {
    case 'Квартира': return '1000';
    case 'Бунгало': return '0';
    case 'Дворец': return '10000';
    case 'Дом': return '5000';
    default: throw new Error('Unrecognized type of the type');
  }
};

var accomondationTypeList = document.querySelector('#type');

function setMinPriceInput() {
  setMinPrice(getMinPrice(getPinType(accomondationTypeList.value)));
}
accomondationTypeList.addEventListener('change', function () {
  setMinPriceInput();
});

setMinPriceInput();

var checkIn = document.getElementById('timein');
var checkOut = document.getElementById('timeout');

function checkInOutSwitcher(changedElement, elementToChange) {
  elementToChange.selectedIndex = changedElement.selectedIndex;
}

checkIn.addEventListener('change', function () {
  checkInOutSwitcher(checkIn, checkOut);
});

checkOut.addEventListener('change', function () {
  checkInOutSwitcher(checkOut, checkIn);
});


var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

var roomsMapDisabled = {
  1: [0, 1, 3],
  2: [3, 0],
  3: [3],
  100: [1, 2, 0]
};

var roomsMapSelected = {
  1: [2],
  2: [2],
  3: [2],
  100: [3]
};
var roomNumbersDisablesReset = [0, 1, 2, 3];

function resetRoomNumbers() {
  roomNumbersDisablesReset.forEach(function (index) {
    capacity.children[index].removeAttribute('disabled', '');
    capacity.children[index].removeAttribute('selected', '');
  });
}

function setRoomNumbersValid(v) {
  roomsMapDisabled[v].forEach(function (index) {
    capacity.children[index].setAttribute('disabled', '');
  });
  roomsMapSelected[v].forEach(function (index) {
    capacity.children[index].setAttribute('selected', '');
  });
}

roomNumber.addEventListener('change', function () {
  resetRoomNumbers();
  setRoomNumbersValid(roomNumber.value);
});

resetRoomNumbers();
setRoomNumbersValid(roomNumber.value);

var userTitleInput = document.getElementById('title');
userTitleInput.addEventListener('invalid', function () {
  var message = '';
  if (userTitleInput.validity.tooShort) {
    message = 'Имя должно состоять минимум из 30-х символов';
  } else if (userTitleInput.validity.tooLong) {
    message = 'Имя не должно превышать 100-та символов';
  } else if (userTitleInput.validity.valueMissing) {
    message = 'Обязательное поле';
  } else {
    message = '';
  }
  userTitleInput.setCustomValidity(message);
});

userTitleInput.addEventListener('input', function (evt) {
  var message = '';
  var target = evt.target;
  if (target.value.length < 30) {
    message = 'Имя должно состоять минимум из 30-х символов';
  } else if (target.value.length > 100) {
    message = 'Имя не должно превышать 100-та символов';
  } else if (userTitleInput.validity.valueMissing) {
    message = 'Обязательное поле';
  } else {
    message = '';
  }
  target.setCustomValidity(message);
});

address.parentNode.removeAttribute('disabled');