'use strict';
(function () {
  function getRandomNumber(min, max) {
    if (typeof max === 'undefined') {
      max = min;
      min = 0;
    }
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  }

  function getRandomElement(array) {
    var length = array.length;
    var randomIndex = getRandomNumber(length - 1);
    return array[randomIndex];
  }

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

  window.randoms = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    generateArrayRandomNumber: generateArrayRandomNumber
  };

})();
