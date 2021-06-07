//Функция, возвращающая случайное целое число из переданного диапазона включительно.
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

  const dirtyResult = Math.random() * (max - min) + min;
  return Number(dirtyResult.toFixed(numberOfDecimalSpaces));
}

getRandomArbitrary(1.2, 2.3, 6);

// Создание массива из десяти сгенерированных объектов

const TOTAL_ADS = 10;

const AVATARS_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
  'img/avatars/user11.png',
  'img/avatars/default.png',
];

const TITLES_LIST = [
  'Очень интересное предложение!',
  'Бронируй, пока не разобрали',
  'Дешевле не будет',
  'Специально для вас',
];

const TYPE_OPTIONS = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_OPTIONS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION_LIST = [
  'Очаровательная квартира в центре',
  'Место для всей семьи',
  'Убежище для усташей души',
  'Переночевать - и отправиться дальше',
  'Ваш лучший отпуск - здесь',
  'Апартаменты с видом на океан',
  'Уголок для кочевников',
];

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION_RANGE = {
  LATITUDE: {
    MIN: 35.65,
    MAX: 35.7,
  },
  LONGTITUDE: {
    MIN: 139.7,
    MAX: 139.8,
  },
  ROUNDING: 5,
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

const createAds = () => ({
  author: getRandomArrayElement(AVATARS_LIST),

  offer: {
    title: getRandomArrayElement(TITLES_LIST),
    price: getRandomIntInclusive(10, 10000),
    type: getRandomArrayElement(TYPE_OPTIONS),
    rooms: getRandomIntInclusive(1, 10),
    guests: getRandomIntInclusive(1, 30),
    checkin: getRandomArrayElement(CHECK_OPTIONS),
    checkout: getRandomArrayElement(CHECK_OPTIONS),
    features: getRandomArray(FEATURES_LIST),
    description: getRandomArrayElement(DESCRIPTION_LIST),
    photos: getRandomArray(PHOTOS_LIST),
  },

  location: {
    lat: getRandomArbitrary(LOCATION_RANGE.LATITUDE.MIN, LOCATION_RANGE.LATITUDE.MAX, LOCATION_RANGE.ROUNDING),
    lng: getRandomArbitrary(LOCATION_RANGE.LONGTITUDE.MIN, LOCATION_RANGE.LONGTITUDE.MAX, LOCATION_RANGE.ROUNDING),
  },
});

const similarAds = new Array(TOTAL_ADS).fill(null).map(() => createAds());

similarAds();

