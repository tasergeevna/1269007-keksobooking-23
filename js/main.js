// Точка входа
import {generateAdMarkup} from './card.js';
import {createAds} from './ads.js';
import{activation, deactivation, titleValidity, titleValidityInProcess, priceValidity, roomsValidity, guestsValidity, adTitle, priceForANight, rooms, guests} from './form.js';

generateAdMarkup(createAds());
deactivation('.ad-form');
deactivation('.map__filters');
activation('.ad-form');
activation('.map__filters');
titleValidity(adTitle);
titleValidityInProcess(adTitle);
priceValidity(priceForANight);
roomsValidity(rooms, guests);
guestsValidity(guests, rooms);
