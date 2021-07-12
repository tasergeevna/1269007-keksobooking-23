import {deactivation, FORM_CONTAINER, MAP_FILTERS_CONTAINER, activationForForm} from './form.js';
import {setAddress, addInteractiveMap, TOKIO_CENTER, addressInput, mapClass, setMainPinOnMap} from './map.js';
import {addFilters, onFilter} from './filter.js';
import {getData} from './api.js';


deactivation(FORM_CONTAINER);
deactivation(MAP_FILTERS_CONTAINER);
const interactiveMap = addInteractiveMap(mapClass, TOKIO_CENTER);
setAddress(addressInput, TOKIO_CENTER);
const mainMarker = setMainPinOnMap(interactiveMap, TOKIO_CENTER, addressInput);
getData((ads) => {
  onFilter(ads, interactiveMap);
  addFilters(ads, interactiveMap);
  activationForForm(ads, interactiveMap, mainMarker);
},
() => activationForForm([], interactiveMap, mainMarker),
);


