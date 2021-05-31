// Функция, возвращающая случайное целое число из переданного диапазона включительно.
//За основу взята функция с ресурса https://developer.mozilla.org

function getRandomIntInclusive(min, max) {
  if (min < 0 || max < 0) {
    return 'Функция не принимает отрицательные значения!';
  }
  if (max <= min) {
    return 'Максимальное значение должно быть больше минимального!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(6, 10);


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//За основу взята функция с ресурса https://developer.mozilla.org

function getRandomArbitrary(min, max, numberOfDecimalSpaces) {
  if (min < 0 || max < 0) {
    return 'Функция не принимает отрицательные значения!';
  }
  if (max <= min) {
    return 'Максимальное значение должно быть больше минимального!';
  }
  const dirtyResult = Math.random() * (max - min) + min;
  return Number(dirtyResult.toFixed(numberOfDecimalSpaces));
}

getRandomArbitrary(1.2, 2.3, 6);
