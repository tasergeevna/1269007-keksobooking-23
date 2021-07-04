// Реализация карты
import {activation, FORM_CLASS, MAP_FILTERS_CLASS} from './form.js';
import {generateAdMarkup} from './card.js';

const TOKIO_CENTER = {
  LAT: 35.68,
  LNG: 139.75,
};

const mapClass = 'map-canvas';

const resetButton = document.querySelector('.ad-form__reset');

const addressInput = document.querySelector('#address');

const setAddress = (changingInput, centerCoords) => {
  changingInput.value = `${centerCoords.LAT}, ${centerCoords.LNG}`;
  changingInput.setAttribute('disabled', 'disabled');
};

const addInteractiveMap = (classForMap, centerCoords) => {
  const map = L.map(classForMap)
    .on('load', () => {
      activation(FORM_CLASS);
      activation(MAP_FILTERS_CLASS);
    })
    .setView({
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    }, 16);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map;
};

const setMainPinOnMap = (intMap, centerCoords, inputWithAddress, buttonThatResets) => {

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  ).on('move', (evt) => {
    inputWithAddress.value = `${evt.latlng.lat.toFixed(5)}, ${evt.latlng.lng.toFixed(5)}`;
  });

  mainPinMarker.addTo(intMap);

  mainPinMarker.on('moveend', (evt) => {
    evt.target.getLatLng();
  });

  buttonThatResets.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    });
    intMap.setView({
      lat: centerCoords.LAT,
      lng: centerCoords.LNG,
    }, 16);
  });
};

const setSimplePinsOnMap = (adsArray, intMap) => {

  const simplePinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  adsArray.forEach((ad) => {
    const {location: { lat, lng }} = ad;

    const marker = L.marker({
      lat,
      lng,
    },
    {
      draggable: true,
      icon: simplePinIcon,
    },
    );

    marker
      .addTo(intMap)
      .bindPopup(generateAdMarkup(ad),
        {
          keepInView: true,
        },
      );
  });
};

export {setAddress, addInteractiveMap, setMainPinOnMap, setSimplePinsOnMap, TOKIO_CENTER, addressInput, mapClass, resetButton};
