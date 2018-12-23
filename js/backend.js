'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var form = document.querySelector('.ad-form--disabled');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.form.setFormDefaultValues(window.formDefaultValues);
    });
    evt.preventDefault();
  });


  var URL_SEND = 'https://js.dump.academy/keksobooking/data';

  var data = {
    xhrResult: null
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      return xhr.response;
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL_SEND);
    xhr.send();
  };


})();

  // function load(onSuccess, onError) {
  //   setTimeout(function () {
  //     var success = Math.round(Math.random());
  //     if (success) {
  //       onSuccess(success);
  //     } else {
  //       onError(success);
  //     }
  //   }, 2000);
  // }

  // var data = {
  //   xhrResult: null
  // };

  // function onSuccess(data, n) {
  //   console.log('success', n);

  //   data.xhrResult = n;
  // }

  // function onError(data, n) {
  //   console.log('error', n);
  //   data.xhrResult = n;
  // }

  // document.querySelector('#send')
  //   .addEventListener('click', function(){
  //     load(
  //       onSuccess.bind(this, data),
  //       onError.bind(this, data)
  //     );
  //   });

  // document.querySelector('#show')
  //   .addEventListener('click', function(){
  //     console.log(data.xhrResult);
  //   });
