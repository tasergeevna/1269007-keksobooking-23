// Точка входа
import {generateAdMarkup} from './card.js';
import {createAds} from './ads.js';
import{activation, deactivation} from './form.js';

generateAdMarkup(createAds());
activation('.ad-form');
activation('.map__filters');
deactivation('.ad-form');
deactivation('.map__filters');
