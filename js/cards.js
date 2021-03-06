'use strict';
(function () {

  var cardTemplate = document
                    .querySelector('#card')
                    .content
                    .querySelector('.map__card');

  function getApartmentType(offerType) {
    switch (offerType) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'palace': return 'Дворец';
      case 'house': return 'Дом';
      default: throw new Error('Unregognized type of the offer');
    }
  }

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
    typeContext.textContent = getApartmentType(type);
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
    var featureElements = cardElement.querySelectorAll('.popup__feature');
    featureElements.forEach(function (element) {
      element.classList.add('visually-hidden');
    });
    features.forEach(function (value) {
      cardElement.querySelector('.popup__feature--' + value).classList.remove('visually-hidden');
    });
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

  var createCardToDom = function (card) {
    return window.domElements.fragment.appendChild(renderCard(cardTemplate, card));
  };
  var closeOpenedCard = function () {
    var closeCard = document.querySelector('.map__card');
    if (closeCard) {
      closeCard.remove();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.const.ESC_KEYCODE) {
      closeOpenedCard();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);

  // получить данные один раз.
  window.domElements.pinListElement.onclick = function (evt) {
    var dataIndex = window.pins.getClickedPin(evt);
    if (dataIndex) {
      closeOpenedCard();
      createCardToDom(window.pins.pins[dataIndex]);
      window.domElements.pinListElement.appendChild(window.domElements.fragment);
      window.form.setPinLocationToForm(dataIndex);
    }
  };

  window.cards = {
    getApartmentType: getApartmentType
  };

})();
