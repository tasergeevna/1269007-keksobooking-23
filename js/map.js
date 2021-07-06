// Реализация карты
import {activation, FORM_CLASS, MAP_FILTERS_CLASS} from './form.js';
import {generateAdMarkup} from './card.js';

const TOKIO_CENTER = {
  LAT: 35.68,
  LNG: 139.75,
};

const TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_PIN_URL = '../img/main-pin.svg';

const MAIN_PIN_SIZE = [52, 52];

const MAIN_PIN_ANCHOR = [26, 52];

const SIMPLE_PIN_URL = '../img/pin.svg';

const SIMPLE_PIN_SIZE = [40, 40];

const SIMPLE_PIN_ANCHOR = [20, 40];

const mapClass = 'map-canvas';

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
    TILE,
    {
      attribution: TILE_ATTRIBUTION,
    },
  ).addTo(map);

  return map;
};

const setMainPinOnMap = (intMap, centerCoords, inputWithAddress) => {
  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_URL,
    iconSize: MAIN_PIN_SIZE,
    iconAnchor: MAIN_PIN_ANCHOR,
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

  return mainPinMarker;
};

const setSimplePinsOnMap = (adsArray, intMap) => {

  const simplePinIcon = L.icon({
    iconUrl: SIMPLE_PIN_URL,
    iconSize: SIMPLE_PIN_SIZE,
    iconAnchor: SIMPLE_PIN_ANCHOR,
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

export {setAddress, addInteractiveMap, setMainPinOnMap, setSimplePinsOnMap, TOKIO_CENTER, addressInput, mapClass};
