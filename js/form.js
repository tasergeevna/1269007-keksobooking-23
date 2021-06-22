// Реализация формы: заполнение, условия заполнения

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const adTitle = document.querySelector('#title');
const priceForANight = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const typeOfHousing = document.querySelector('#type');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

const activation = (elemClass) => {
  const element = document.querySelector(elemClass);
  if (element.classList.contains(`${elemClass}--disabled`)) {
    element.classList.remove(`${elemClass}--disabled`);
  }

  const elems = element.querySelectorAll('select, input, textarea, button');
  for (let i = 0; i < elems.length-1; i++) {
    if (elems[i].hasAttribute('disabled')) {
      elems[i].removeAttribute('disabled', 'disabled');
    }
  }
};

const deactivation = (elemClass) => {
  const element = document.querySelector(elemClass);
  if (!element.classList.contains(`${elemClass}--disabled`)) {
    element.classList.add(`${elemClass}--disabled`);
  }
  const elems = element.querySelectorAll('select, input, button, textarea');
  for (let i = 0; i < elems.length-1; i++) {
    if (!elems[i].hasAttribute('disabled')) {
      elems[i].setAttribute('disabled', 'disabled');
    }
  }
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
    if (valueLength < MIN_TITLE_LENGTH) {
      inputName.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      inputName.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
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
    inputRooms.reportValidity();
  });
};

const guestsValidity  = (inputGuests, inputRooms) => {
  inputGuests.addEventListener('change', (evt) => {
    inputRooms.setCustomValidity('');
    if (evt.target.value === '1' && inputRooms.value !== '1' && inputRooms.value !== '2' && inputRooms.value !=='3') {
      inputGuests.setCustomValidity('Можно выбрать одну, две или три комнаты');
    }
    if (evt.target.value === '2' && inputRooms.value !== '2' && inputRooms.value !== '3') {
      inputGuests.setCustomValidity('Можно выбрать две или три комнаты');
    }
    if (evt.target.value === '3' && inputRooms.value !== '3') {
      inputGuests.setCustomValidity('Можно выбрать три комнаты');
    }
    if (evt.target.value === '0' && inputRooms.value !== '100') {
      inputGuests.setCustomValidity('Можно выбрать помещение для мероприятий');
    }

    inputGuests.reportValidity();
  });
};

const typeOfHousingValidity = (inputType, inputPrice) => {
  inputType.addEventListener('change', (evt) => {
    inputType.setCustomValidity('');
    const minPrice = inputPrice.getAttribute('min');
    if (evt.target.value === 'bungalow' && minPrice !== '0') {
      inputPrice.setAttribute('min', '0');
      inputPrice.setAttribute('placeholder', '0');
    }

    if (evt.target.value === 'flat' && minPrice !== '1000') {
      inputPrice.setAttribute('min', '1000');
      inputPrice.setAttribute('placeholder', '1000');
    }

    if (evt.target.value === 'hotel' && minPrice !== '3000') {
      inputPrice.setAttribute('min', '3000');
      inputPrice.setAttribute('placeholder', '3000');
    }

    if (evt.target.value === 'house' && minPrice !== '5000') {
      inputPrice.setAttribute('min', '5000');
      inputPrice.setAttribute('placeholder', '5000');
    }

    if (evt.target.value === 'palace' && minPrice !== '10000') {
      inputPrice.setAttribute('min', '10000');
      inputPrice.setAttribute('placeholder', '10000');
    }
    inputType.reportValidity();
  });
};

const checkInValidity = (checkin, checkout) => {
  checkin.addEventListener('change', (evt) => {
    if (evt.target.value === '12:00') {
      checkout.value = '12:00';
    }
    if (evt.target.value === '13:00') {
      checkout.value = '13:00';
    }
    if (evt.target.value === '14:00') {
      checkout.value = '14:00';
    }
    checkin.reportValidity();
  });
};

const checkOutValidity = (checkout, chekin) => {
  checkout.addEventListener('change', (evt) => {
    if (evt.target.value === '12:00') {
      chekin.value = '12:00';
    }
    if (evt.target.value === '13:00') {
      chekin.value = '13:00';
    }
    if (evt.target.value === '14:00') {
      chekin.value = '14:00';
    }
    checkout.reportValidity();
  });
};

export {activation, deactivation, titleValidity, titleValidityInProcess, priceValidity, roomsValidity, guestsValidity, typeOfHousingValidity, checkInValidity, checkOutValidity, adTitle, priceForANight, rooms, guests, typeOfHousing, checkIn, checkOut};
