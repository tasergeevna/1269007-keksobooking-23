// Создание массива из десяти сгенерированных объектов

const TOTAL_ADS = 10;

const AVATARS = [
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

const TITLES = [
  'Очень интересное предложение!',
  'Бронируй, пока не разобрали',
  'Дешевле не будет',
  'Специально для вас',
];

const PRICES = {
  MIN: 10,
  MAX: 10000,
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = {
  MIN: 1,
  MAX: 10,
};

const GUESTS = {
  MIN: 1,
  MAX: 30,
};

const CHECK_SPANS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Очаровательная квартира в центре',
  'Место для всей семьи',
  'Убежище для усташей души',
  'Переночевать - и отправиться дальше',
  'Ваш лучший отпуск - здесь',
  'Апартаменты с видом на океан',
  'Уголок для кочевников',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LocationRange = {
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

const createAds = () => {
  const location = {
    lat: getRandomArbitrary(LocationRange.LATITUDE.MIN, LocationRange.LATITUDE.MAX, LocationRange.ROUNDING),
    lng: getRandomArbitrary(LocationRange.LONGTITUDE.MIN, LocationRange.LONGTITUDE.MAX, LocationRange.ROUNDING),
  };
  return {
    author: getRandomArrayElement(AVATARS),
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntInclusive(PRICES.MIN, PRICES.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomIntInclusive(GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomArrayElement(CHECK_SPANS),
      checkout: getRandomArrayElement(CHECK_SPANS),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location,
  };
};

const similarAds = new Array(TOTAL_ADS).fill(null).map(createAds);
