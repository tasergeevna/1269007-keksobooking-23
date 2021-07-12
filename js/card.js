const engTypesToRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarCardsTemplate = document.querySelector('#card').content.querySelector('.popup');

const insertToDOM = (target, node) => {
  target.appendChild(node);
};

const addPhotosToDOMFromFragment = (photos, newClass, currentTemplate) => {
  const imgTemplate = currentTemplate.querySelector('.popup__photo');
  const imgWidth = imgTemplate.getAttribute('width');
  const imgHeight = imgTemplate.getAttribute('height');
  const imgAlt = imgTemplate.getAttribute('alt');
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const newElement = document.createElement('img');
    newElement.classList.add(newClass);
    newElement.src = photo;
    newElement.setAttribute('width', imgWidth);
    newElement.setAttribute('height', imgHeight);
    newElement.setAttribute('alt', imgAlt);
    insertToDOM(photosFragment, newElement);
  });

  return photosFragment;
};

const generateAdMarkup = (ad) => {

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
  if (!ad.offer.features) {
    popupElement.querySelector('.popup__features').remove;
  } else {
    const featureListElement = popupElement.querySelector('.popup__features');
    const modifiers = ad.offer.features.map((feature) => `${'.popup__feature'}--${feature}`);
    featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = `.${item.classList[1]}`;
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
  if (!ad.offer.description) {
    popupElement.querySelector('.popup__description').remove();
  } else {
    popupElement.querySelector('.popup__description').textContent = ad.offer.description;
  }
  if (ad.offer.photos) {
    const pics = addPhotosToDOMFromFragment(ad.offer.photos, 'popup__photo', similarCardsTemplate);
    const parentNode = popupElement.querySelector('.popup__photos');
    parentNode.innerHTML = '';
    insertToDOM(parentNode, pics);
    insertToDOM(popupElement, parentNode);
  } else {
    popupElement.querySelector('.popup__photo').remove();
  }

  popupElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return popupElement;
};

export {generateAdMarkup};
