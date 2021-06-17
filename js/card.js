// Создание карточки объявления для интерактивной карты

const RusTypes = {
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
      popupElement.querySelector('.popup__type').textContent = RusTypes[ad.offer.type];
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
    const featureListElement = popupElement.querySelector('.popup__features');
    const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
    featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
    if (!ad.offer.description) {
      popupElement.querySelector('.popup__description').remove();
    } else {
      popupElement.querySelector('.popup__description').textContent = ad.offer.description;
    }
    const pics = document.createDocumentFragment();
    for (let i = 0; i < ad.offer.photos.length; i++) {
      const newElement = document.createElement('img');
      newElement.classList.add('.popup__photo');
      newElement.src =  ad.offer.photos[i];
      insertToDOM(pics, newElement);
    }
    insertToDOM(popupElement, pics);
    popupElement.querySelector('.popup__avatar').src = ad.author;
    insertToDOM(popupElementsList, popupElement);
  });
};

export {generateAdMarkup};
