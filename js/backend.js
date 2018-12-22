'use strict';
(function () {
  // var URL = 'https://js.dump.academy/keksobooking';

  // window.upload = function (data, onLoad) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     onLoad(xhr.response);
  //   });

  //   xhr.open('POST', URL);
  //   xhr.send(data);
  // };

  // var form = document.querySelector('.ad-form--disabled');
  // form.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(form), function (response) {
  //     window.utils.userDialog.classList.add('hidden');
  //   });
  //   evt.preventDefault();
  // });


  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();

