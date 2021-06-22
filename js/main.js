// Точка входа
import {generateAdMarkup} from './card.js';
import {createAds} from './ads.js';
import{activation, deactivation, titleValidity, titleValidityInProcess, priceValidity, roomsValidity, guestsValidity, typeOfHousingValidity, checkInValidity, checkOutValidity, adTitle, priceForANight, rooms, guests, typeOfHousing, checkIn, checkOut} from './form.js';

deactivation('.ad-form');
deactivation('.map__filters');
generateAdMarkup(createAds());
activation('.ad-form');
activation('.map__filters');
titleValidity(adTitle);
titleValidityInProcess(adTitle);
priceValidity(priceForANight);
roomsValidity(rooms, guests);
guestsValidity(guests, rooms);
typeOfHousingValidity(typeOfHousing, priceForANight);
checkInValidity(checkIn, checkOut);
checkOutValidity(checkOut, checkIn);
