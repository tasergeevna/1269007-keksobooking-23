// Точка входа
import {deactivation, FORM_CLASS, MAP_FILTERS_CLASS, formValidity, setUserFormSubmit, setUserFormReset} from './form.js';
import {setAddress, addInteractiveMap, TOKIO_CENTER, addressInput, mapClass, setMainPinOnMap} from './map.js';
import {addFilters, onFilter} from './filter.js';
import {getData} from './api.js';
import {uploadPhotos, avatarChooser, avatarPreview, photoChooser, photoPreview} from './photos.js';

deactivation(FORM_CLASS);
deactivation(MAP_FILTERS_CLASS);
setAddress(addressInput, TOKIO_CENTER);
const interactiveMap = addInteractiveMap(mapClass, TOKIO_CENTER);
const mainMarker = setMainPinOnMap(interactiveMap, TOKIO_CENTER, addressInput);
getData((ads) => {
  onFilter(ads, interactiveMap);
  addFilters(ads, interactiveMap);
});
setUserFormSubmit(FORM_CLASS, interactiveMap, mainMarker, TOKIO_CENTER);
setUserFormReset(FORM_CLASS, interactiveMap, mainMarker, TOKIO_CENTER);
formValidity();
uploadPhotos(avatarChooser, avatarPreview);
uploadPhotos(photoChooser, photoPreview);
