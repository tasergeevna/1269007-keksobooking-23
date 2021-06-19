// Точка входа
import {generateAdMarkup} from './card.js';
import {similarAds} from './ads.js';
import{activation} from './form.js';

generateAdMarkup(similarAds);
activation('.ad-form', false);
activation('.map__filters', false);
