// Точка входа
import {deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity, setUserFormSubmit, resetForm} from './form.js';
import {setAddress, addInteractiveMap, TOKIO_CENTER, addressInput, mapClass, setMainPinOnMap, resetButton, setSimplePinsOnMap} from './map.js';
import {getData, TOTAL_POINTS} from './api.js';

deactivation(FORM_CLASS);
deactivation(MAP_FILTERS_CLASS);
setAddress(addressInput, TOKIO_CENTER);
const interactiveMap = addInteractiveMap(mapClass, TOKIO_CENTER);
setMainPinOnMap(interactiveMap, TOKIO_CENTER, addressInput, resetButton);
getData((ads) => {
  setSimplePinsOnMap(ads.slice(0, TOTAL_POINTS), interactiveMap);
});
setUserFormSubmit(resetForm);
formValidity();

export {interactiveMap};
