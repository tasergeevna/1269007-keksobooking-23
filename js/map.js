// Реализация карты
import {activation, FORM_CLASS, MAP_FILTERS_CLASS} from './form.js';
import {createAds} from './ads.js';
import {generateAdMarkup} from './card.js';

const TOKIO_CENTER = {
  LAT: 35.6894,
  LNG: 139.692,
};

const TOTAL_POINTS = 10;

const resetButton = document.querySelector('.ad-form__reset');

const addressInput = document.querySelector('#address');

addressInput.value = `${TOKIO_CENTER.LAT}, ${TOKIO_CENTER.LNG}`;
addressInput.setAttribute('disabled', 'disabled');

const map = L.map('map-canvas')
  .on('load', () => {
    activation(FORM_CLASS);
    activation(MAP_FILTERS_CLASS);
  })
  .setView({
    lat: TOKIO_CENTER.LAT,
    lng: TOKIO_CENTER.LNG,
  }, 16);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKIO_CENTER.LAT,
    lng: TOKIO_CENTER.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).on('move', (evt) => {
  addressInput.value = `${evt.latlng.lat.toFixed(5)}, ${evt.latlng.lng.toFixed(5)}`;
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  evt.target.getLatLng();
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: TOKIO_CENTER.LAT,
    lng: TOKIO_CENTER.LNG,
  });
  map.setView({
    lat: TOKIO_CENTER.LAT,
    lng: TOKIO_CENTER.LNG,
  }, 16);
});

const simplePinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const similarAds = new Array(TOTAL_POINTS).fill(null).map(createAds);

similarAds.forEach(({location: { lat, lng }}) => {
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
    .addTo(map)
    .bindPopup(generateAdMarkup(),
      {
        keepInView: true,
      },
    );
});
