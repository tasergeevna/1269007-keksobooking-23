import {showAlert, showError} from './messages.js';
import { deactivation, MAP_FILTERS_CONTAINER } from './form.js';

const TOTAL_POINTS = 10;

const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось получить объявления. Попробуйте ещё раз');
      deactivation(MAP_FILTERS_CONTAINER);
      throw Error();
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(onFail);
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
