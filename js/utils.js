// Вспомогательные функции

const ALERT_SHOW_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

//Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Функция не принимает отрицательные значения!';
  }
  if (max <= min) {
    return 'Максимальное значение должно быть больше минимального!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomArbitrary = (min, max, numberOfDecimalSpaces) => {
  if (min < 0 || max < 0) {
    return 'Функция не принимает отрицательные значения!';
  }

  const dirtyResult = Math.random() * (max - min) + min;
  return Number(dirtyResult.toFixed(numberOfDecimalSpaces));
};

const getRandomArrayElement = (elements) => (elements[getRandomIntInclusive(0, elements.length - 1)]);

const getNewArrayLenght = (basicArray) => (getRandomIntInclusive(0, basicArray.length - 1));

const getRandomArray = (array) => {
  const randomArrayLength = getNewArrayLenght(array);
  const result = [];
  for (let i = 0; i <= randomArrayLength; i++) {
    let random = getRandomArrayElement(array);
    while (result.includes(random)) {
      random = getRandomArrayElement(array);
    }
    result.push(random);
  }
  return result;
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const showSuccess = () => {
  const successContainer = successTemplate.cloneNode(true);
  document.body.append(successContainer);

  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 27) {
      successContainer.remove();
    }
  });

  document.body.addEventListener('click', () => {
    successContainer.remove();
  });
};

const showError = () => {
  const errorContainer = errorTemplate.cloneNode(true);
  const errorButton = errorTemplate.querySelector('.error__button');
  document.body.append(errorContainer);

  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 27) {
      errorContainer.remove();
    }
  });

  document.body.addEventListener('click', () => {
    errorContainer.remove();
  });

  errorButton.addEventListener('click', () => {
    errorContainer.remove();
  });

};

export {getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, getNewArrayLenght, getRandomArray, showAlert, showSuccess, showError};
