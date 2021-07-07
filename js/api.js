import {showAlert, showError} from './utils.js';
import { deactivation, MAP_FILTERS_CLASS } from './form.js';

const TOTAL_POINTS = 10;

const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось получить объявления. Попробуйте ещё раз');
      deactivation(MAP_FILTERS_CLASS);
      throw Error();
    })
    .then((ads) => {
      onSuccess(ads);
    });
};

const sendData = (onSuccess, body) => {
  fetch(
    POST_URL,
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
