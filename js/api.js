import {showAlert, showError} from './utils.js';

const TOTAL_POINTS = 10;

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      throw Error();
    })
    .then((ads) => {
      onSuccess(ads);
    });
};


const sendData = (onSuccess, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      showError();
    }
  })
    .catch(() => {
      showError();
    });
};

export {getData, sendData, TOTAL_POINTS};
