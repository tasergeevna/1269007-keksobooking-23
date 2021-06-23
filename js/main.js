// Точка входа
import {generateAdMarkup} from './card.js';
import {activation, deactivation, formValidity} from './form.js';

deactivation('.ad-form');
deactivation('.map__filters');
generateAdMarkup();
activation('.ad-form');
activation('.map__filters');
formValidity();
