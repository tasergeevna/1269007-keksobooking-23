import {sendData} from './api.js';
import {addressInput, setAddress, TOKIO_CENTER} from './map.js';
import { showSuccess } from './messages.js';
import { onFilter} from './filter.js';
import {avatarPreview, photoPreview, photoChooser, avatarChooser, uploadPhotos} from './photos.js';

const TITLE_LENGTH = {
  MIN: 30,
  MAX: 100,
};


const typeToPrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
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

const validatePriceAndHousing = (inputHousing, inputPrice) => {
  inputPrice.setCustomValidity('');
  inputHousing.setCustomValidity('');
  inputPrice.setAttribute('min', typeToPrice[inputHousing.value]);
  inputPrice.setAttribute('placeholder', typeToPrice[inputHousing.value]);
  if (inputPrice.validity.rangeUnderflow) {
    const minPrice = Number(inputPrice.getAttribute('min'));
    inputPrice.setCustomValidity(`Минимальная стоимость - ${minPrice}`);
  } else if (inputPrice.validity.rangeOverflow) {
    const maxPrice = Number(inputPrice.getAttribute('max'));
    inputPrice.setCustomValidity(`Максимальная стоимость - ${maxPrice}`);
  } else if (inputPrice.validity.valueMissing) {
    inputPrice.setCustomValidity('Это поле обязательно заполнить');
  }
  inputHousing.reportValidity();
  inputPrice.reportValidity();
};

const priceValidity = (inputHousing, inputPrice) => {
  inputPrice.addEventListener('input', () => {
    validatePriceAndHousing(inputHousing, inputPrice);
  });
};

const typeOfHousingValidity = (inputHousing, inputPrice) => {
  inputHousing.addEventListener('change', () => {
    validatePriceAndHousing(inputHousing, inputPrice);
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
  priceValidity(typeOfHousing, priceForANight);
  roomsValidity(rooms, guests);
  guestsValidity(guests, rooms);
  typeOfHousingValidity(typeOfHousing, priceForANight);
  checkInValidity(checkIn, checkOut);
  checkOutValidity(checkOut, checkIn);
};

const resetForm = () => {
  adTitle.value = '';
  priceForANight.value = '';
  priceForANight.setAttribute('placeholder', '1000');
  priceForANight.setAttribute('min', '1000');
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

const setUserFormSubmit = (formClass, interactiveMap, mainPin, centerCoords, ads) => {
  document.querySelector(formClass).addEventListener('submit', (evt) => {
    evt.preventDefault();
    addressInput.removeAttribute('disabled');
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
        onFilter(ads, interactiveMap);
        showSuccess();
      },
      new FormData(evt.target),
    );
  });
};

const setUserFormReset = (formClass, interactiveMap, mainPin, centerCoords, ads) => {
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
    onFilter(ads, interactiveMap);
  });
};

const activationForForm = (ads, interactiveMap, mainMarker) => {
  setUserFormSubmit(FORM_CONTAINER, interactiveMap, mainMarker, TOKIO_CENTER, ads);
  setUserFormReset(FORM_CONTAINER, interactiveMap, mainMarker, TOKIO_CENTER, ads);
  formValidity();
  uploadPhotos(avatarChooser, avatarPreview);
  uploadPhotos(photoChooser, photoPreview);
};


export {activation, deactivation, FORM_CONTAINER, MAP_FILTERS_CONTAINER, filtersHousingType, filtersHousingPrice, filtersHousingRooms, filtersHousingGuests, filtersHousingFeatures, activationForForm};
