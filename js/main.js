// Точка входа
import {deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity} from './form.js';
import {setAddress, addInteractiveMap, TOKIO_CENTER, addressInput, mapClass, setMainPinOnMap, resetButton, setSimplePinsOnMap, similarAds} from './map.js';
import './map.js';

deactivation(FORM_CLASS);
deactivation(MAP_FILTERS_CLASS);
setAddress(addressInput, TOKIO_CENTER);
const interactiveMap = addInteractiveMap(mapClass, TOKIO_CENTER);
setMainPinOnMap(interactiveMap, TOKIO_CENTER, addressInput, resetButton);
setSimplePinsOnMap(similarAds, interactiveMap);
formValidity();
