// Реализация формы: заполнение, условия заполнения, валидация
import {sendData} from './api.js';
import {addressInput, setAddress, TOKIO_CENTER} from './map.js';
import { showSuccess } from './messages.js';

const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};

const FORM_CLASS = '.ad-form';
const MAP_FILTERS_CLASS = '.map__filters';

const adTitle = document.querySelector('#title');
const priceForANight = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const typeOfHousing = document.querySelector('#type');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const features = document.querySelectorAll('.features__checkbox');
const fieldset = document.querySelector('#description');

const filtersHousingType = document.querySelector('#housing-type');
const filtersHousingPrice = document.querySelector('#housing-price');
const filtersHousingRooms = document.querySelector('#housing-rooms');
const filtersHousingGuests = document.querySelector('#housing-guests');
const filtersHousingFeatures = document.querySelectorAll('.map__checkbox');

const typeToPrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const activation = (elemClass) => {
  const element = document.querySelector(elemClass);
  element.classList.remove(`${elemClass}--disabled`);

  const elems = element.querySelectorAll('select, input:not(#address), textarea, button');
  elems.forEach((elem) => {
    elem.removeAttribute('disabled', 'disabled');
  });
};

const deactivation = (elemClass) => {
  const element = document.querySelector(elemClass);
  element.classList.add(`${elemClass}--disabled`);

  const elems = element.querySelectorAll('select, input, button, textarea');
  elems.forEach((elem) => {
    elem.setAttribute('disabled', 'disabled');
  });
};

const titleValidity = (inputName) => {
  inputName.addEventListener('invalid', () => {
    if (inputName.validity.tooShort) {
      inputName.setCustomValidity('Название должно состоять минимум из 30 символов');
    } else if (inputName.validity.tooLong) {
      adTitle.setCustomValidity('Название не должно быть длиннее 100 символов');
    } else if (inputName.validity.valueMissing) {
      inputName.setCustomValidity('Это поле обязательно заполнить');
    } else {
      inputName.setCustomValidity('');
    }
  });
};

const titleValidityInProcess = (inputName) => {
  inputName.addEventListener('input', () => {
    const valueLength = adTitle.value.length;
    if (valueLength < TITLE_LENGTH.MIN) {
      inputName.setCustomValidity(`Ещё ${  TITLE_LENGTH.MIN - valueLength } симв.`);
    } else if (valueLength > TITLE_LENGTH.MAX) {
      inputName.setCustomValidity(`Удалите лишние ${  valueLength - TITLE_LENGTH.MAX } симв.`);
    } else {
      inputName.setCustomValidity('');
    }

    inputName.reportValidity();
  });
};

const priceValidity = (inputName) => {
  inputName.addEventListener('input', () => {
    if (inputName.validity.rangeUnderflow) {
      const minPrice = Number(inputName.getAttribute('min'));
      inputName.setCustomValidity(`Минимальная стоимость - ${minPrice}`);
    } else if (inputName.validity.rangeOverflow) {
      const maxPrice = Number(inputName.getAttribute('max'));
      inputName.setCustomValidity(`Максимальная стоимость - ${maxPrice}`);
    } else if (inputName.validity.valueMissing) {
      inputName.setCustomValidity('Это поле обязательно заполнить');
    } else {
      inputName.setCustomValidity('');
    }

    inputName.reportValidity();
  });
};

const typeOfHousingValidity = (inputType, inputPrice) => {
  inputType.addEventListener('change', (evt) => {
    inputType.setCustomValidity('');
    const type = evt.target.value;
    inputPrice.setAttribute('min', typeToPrice[type]);
    inputPrice.setAttribute('placeholder', typeToPrice[type]);
    inputType.reportValidity();
  });
};

const roomsValidity = (inputRooms, inputGuests) => {
  inputRooms.addEventListener('change', () => {
    inputRooms.setCustomValidity('');
    if (inputRooms.value === '1' && inputGuests.value !== '1') {
      inputRooms.setCustomValidity('Можно забронировать для одного гостя');
    }

    if (inputRooms.value === '2' && inputGuests.value !== '1' && inputGuests.value !== '2') {
      inputRooms.setCustomValidity('Можно забронировать для одного или двух гостей');
    }
    if (inputRooms.value === '3' && inputGuests.value !== '1' && inputGuests.value !== '2' && inputGuests.value !=='3') {
      inputRooms.setCustomValidity('Можно забронировать для одного, двух или трех гостей');
    }
    if (inputRooms.value === '100' && inputGuests.value !== '0') {
      inputRooms.setCustomValidity('Нельзя забронировать для гостей');
    }
    if (inputRooms.value === inputGuests.value) {
      inputGuests.setCustomValidity('');
    }

    inputRooms.reportValidity();
  });
};

const guestsValidity  = (inputGuests, inputRooms) => {
  inputGuests.addEventListener('change', () => {
    inputGuests.setCustomValidity('');
    if (inputGuests.value === '1' && inputRooms.value !== '1' && inputRooms.value !== '2' && inputRooms.value !=='3') {
      inputGuests.setCustomValidity('Можно выбрать одну, две или три комнаты');
    }
    if (inputGuests.value === '2' && inputRooms.value !== '2' && inputRooms.value !== '3') {
      inputGuests.setCustomValidity('Можно выбрать две или три комнаты');
    }
    if (inputGuests.value === '3' && inputRooms.value !== '3') {
      inputGuests.setCustomValidity('Можно выбрать три комнаты');
    }
    if (inputGuests.value === '0' && inputRooms.value !== '100') {
      inputGuests.setCustomValidity('Можно выбрать помещение для мероприятий');
    }
    if (inputRooms.value === inputGuests.value) {
      inputRooms.setCustomValidity('');
    }

    inputGuests.reportValidity();
  });
};

const checkInValidity = (checkin, checkout) => {
  checkin.addEventListener('change', (evt) => {
    checkout.value = evt.target.value;
    checkin.reportValidity();
  });
};

const checkOutValidity = (checkout, chekin) => {
  checkout.addEventListener('change', (evt) => {
    chekin.value = evt.target.value;
    checkout.reportValidity();
  });
};

const formValidity = () => {
  titleValidity(adTitle);
  titleValidityInProcess(adTitle);
  priceValidity(priceForANight);
  roomsValidity(rooms, guests);
  guestsValidity(guests, rooms);
  typeOfHousingValidity(typeOfHousing, priceForANight);
  checkInValidity(checkIn, checkOut);
  checkOutValidity(checkOut, checkIn);
};

const resetForm = () => {
  adTitle.value = '';

  priceForANight.value = '';

  fieldset.value = '';

  features.forEach((feature) => {
    feature.checked = false;
  });

  rooms.value = '1';

  guests.value = '1';

  typeOfHousing.value = 'flat';

  checkIn.value = '12:00';

  checkOut.value = '12:00';

  filtersHousingType.value = 'any';

  filtersHousingPrice.value = 'any';

  filtersHousingRooms.value = 'any';

  filtersHousingGuests.value = 'any';

  filtersHousingFeatures.forEach((housingFeatures) => {
    housingFeatures.checked = false;
  });

  setAddress(addressInput, TOKIO_CENTER);
};


const setUserFormSubmit = (formClass, interactiveMap, mainPin, centerCoords) => {
  document.querySelector(formClass).addEventListener('submit', (evt) => {
    evt.preventDefault();
    addressInput.removeAttribute('disabled', 'disabled');
    sendData(
      () => {
        mainPin.setLatLng({
          lat: centerCoords.LAT,
          lng: centerCoords.LNG,
        });
        interactiveMap.setView({
          lat: centerCoords.LAT,
          lng: centerCoords.LNG,
        }, 16);
        resetForm();
        showSuccess();
      },
      new FormData(evt.target),
    );
  });
};

const setUserFormReset = (formClass, interactiveMap, mainPin, centerCoords) => {
  document.querySelector(formClass).addEventListener('reset', (evt) => {
    evt.preventDefault();
    mainPin.setLatLng({
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    });
    interactiveMap.setView({
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    }, 16);
    resetForm();
  });
};

export {activation, deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity, setUserFormSubmit, setUserFormReset, filtersHousingType, filtersHousingPrice, filtersHousingRooms, filtersHousingGuests, filtersHousingFeatures};
