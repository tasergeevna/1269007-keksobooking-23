import {sendData} from './api.js';
import {addressInput, setAddress, TOKIO_CENTER} from './map.js';
import { showSuccess } from './messages.js';
import {avatarPreview, photoPreview, photoChooser, avatarChooser, uploadPhotos} from './photos.js';

const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};

const FORM_CONTAINER = '.ad-form';
const MAP_FILTERS_CONTAINER = '.map__filters';

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

const roomsToGuests = {
  1: {
    allowed: ['1'],
    roomsMessage: 'Можно забронировать для одного гостя',
    guestsMessage: 'Можно выбрать одну, две или три комнаты',
  },
  2: {
    allowed:  ['1', '2'],
    roomsMessage: 'Можно забронировать для одного или двух гостей',
    guestsMessage: 'Можно выбрать две или три комнаты',
  },
  3: {
    allowed: ['1', '2', '3'],
    roomsMessage: 'Можно забронировать для одного, двух или трех гостей',
    guestsMessage: 'Можно выбрать три комнаты',
  },
  100: {
    allowed: ['0'],
    roomsMessage: 'Нельзя забронировать для гостей',
    guestsMessage: 'Можно выбрать помещение для мероприятий',
  },
};

const guestsAndRoomsValidation = (inputRooms, inputGuests) => {
  inputRooms.setCustomValidity('');
  inputGuests.setCustomValidity('');
  if (roomsToGuests[inputRooms.value] && !roomsToGuests[inputRooms.value].allowed.includes(inputGuests.value)) {
    inputRooms.setCustomValidity(roomsToGuests[inputRooms.value].roomsMessage);
    inputGuests.setCustomValidity(roomsToGuests[inputRooms.value].guestsMessage);
  }
  inputRooms.reportValidity();
  inputGuests.reportValidity();
};

const roomsValidity = (inputRooms, inputGuests) => {
  inputRooms.addEventListener('change', () => guestsAndRoomsValidation(inputRooms, inputGuests));
};

const guestsValidity  = (inputGuests, inputRooms) => {
  inputGuests.addEventListener('change', () => guestsAndRoomsValidation(inputRooms, inputGuests));
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

  avatarPreview.src = 'img/muffin-grey.svg';

  photoPreview.src = 'img/muffin-grey.svg';

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

const activationForForm = (interactiveMap, mainMarker) => {
  setUserFormSubmit(FORM_CONTAINER, interactiveMap, mainMarker, TOKIO_CENTER);
  setUserFormReset(FORM_CONTAINER, interactiveMap, mainMarker, TOKIO_CENTER);
  formValidity();
  uploadPhotos(avatarChooser, avatarPreview);
  uploadPhotos(photoChooser, photoPreview);
};


export {activation, deactivation, FORM_CONTAINER, MAP_FILTERS_CONTAINER, filtersHousingType, filtersHousingPrice, filtersHousingRooms, filtersHousingGuests, filtersHousingFeatures, activationForForm};
