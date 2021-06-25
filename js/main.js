// Точка входа
import {activation, deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity} from './form.js';
import './map.js';

deactivation(FORM_CLASS);
deactivation(MAP_FILTERS_CLASS);
activation(FORM_CLASS);
activation(MAP_FILTERS_CLASS);
formValidity();
