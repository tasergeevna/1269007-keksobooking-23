// Вспомогательные функции

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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, getNewArrayLenght, getRandomArray, debounce};
