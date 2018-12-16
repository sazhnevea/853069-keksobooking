'use strict';
(function () {
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

  window.data = {
    AD_TITLE: AD_TITLE,
    AD_TYPE: AD_TYPE,
    AD_CHECKIN: AD_CHECKIN,
    AD_CHECKOUT: AD_CHECKOUT,
    AD_FEATURES: AD_FEATURES,
    AD_PHOTOS: AD_PHOTOS
  };
})();
