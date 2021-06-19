// Создание карточки объявления для интерактивной карты

const engTypesToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupElementsList = document.querySelector('.map__canvas');
const similarCardsTemplate = document.querySelector('#card').content.querySelector('.popup');

const insertToDOM = (target, node) => {
  target.appendChild(node);
};

const searchFeaturesInStock = (noneName, parentClass, array, childClass) => {
  const featureListElement = noneName.querySelector(parentClass);
  const modifiers = array.map((feature) => `${childClass}--${feature}`);
  featureListElement.querySelectorAll(childClass).forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const addPhotosToDOMFromFragment = (array, newClass, parentClass, globalNode) => {
  const pics = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const newElement = document.createElement('img');
    newElement.classList.add(newClass);
    newElement.src =  array[i];
    insertToDOM(pics, newElement);
  }
  const parentNode = similarCardsTemplate.querySelector(parentClass);
  insertToDOM(parentNode, pics);
  insertToDOM(globalNode, parentNode);
};

const generateAdMarkup = (someAds) => {
  someAds.forEach((ad) => {
    const popupElement = similarCardsTemplate.cloneNode(true);

    if (!ad.offer.title) {
      popupElement.querySelector('.popup__title').remove();
    } else {
      popupElement.querySelector('.popup__title').textContent = ad.offer.title;
    }

    if (!ad.offer.address) {
      popupElement.querySelector('.popup__text--address').remove();
    } else {
      popupElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    }

    if (!ad.offer.price) {
      popupElement.querySelector('.popup__text--price').remove();
    } else {
      popupElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
    }

    if (!ad.offer.type) {
      popupElement.querySelector('.popup__type').remove();
    } else {
      popupElement.querySelector('.popup__type').textContent = engTypesToRus[ad.offer.type];
    }

    if (!ad.offer.rooms || !ad.offer.guests) {
      popupElement.querySelector('.popup__text--capacity').remove();
    } else {
      popupElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    }

    if (!ad.offer.checkin || !ad.offer.checkout) {
      popupElement.querySelector('.popup__text--time').remove();
    } else {
      popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    }

    searchFeaturesInStock(popupElement, '.popup__features', ad.offer.features, '.popup__feature');

    if (!ad.offer.description) {
      popupElement.querySelector('.popup__description').remove();
    } else {
      popupElement.querySelector('.popup__description').textContent = ad.offer.description;
    }

    addPhotosToDOMFromFragment(ad.offer.photos, '.popup__photo', '.popup__photos', popupElement);

    popupElement.querySelector('.popup__avatar').src = ad.author;
    insertToDOM(popupElementsList, popupElement);
  });
};

export {generateAdMarkup};
