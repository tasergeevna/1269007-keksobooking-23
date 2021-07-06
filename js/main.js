// Точка входа
import {deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity, setUserFormSubmit, setUserFormReset} from './form.js';
import {setAddress, addInteractiveMap, TOKIO_CENTER, addressInput, mapClass, setMainPinOnMap, setSimplePinsOnMap} from './map.js';
import {getData, TOTAL_POINTS} from './api.js';

deactivation(FORM_CLASS);
deactivation(MAP_FILTERS_CLASS);
setAddress(addressInput, TOKIO_CENTER);
const interactiveMap = addInteractiveMap(mapClass, TOKIO_CENTER);
const mainMarker = setMainPinOnMap(interactiveMap, TOKIO_CENTER, addressInput);
getData((ads) => {
  setSimplePinsOnMap(ads.slice(0, TOTAL_POINTS), interactiveMap);
});
setUserFormSubmit(FORM_CLASS);
setUserFormReset(FORM_CLASS, interactiveMap, mainMarker, TOKIO_CENTER);
formValidity();
