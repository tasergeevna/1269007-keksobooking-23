import {filtersHousingType, filtersHousingPrice, filtersHousingRooms, filtersHousingGuests, filtersHousingFeatures} from './form.js';
import { setSimplePinsOnMap } from './map.js';
import {TOTAL_POINTS} from './api.js';
import {debounce} from './utils.js';

const typePrice = {
  low: 10000,
  high: 50000,
};

const onFilter = (ads, interactiveMap) => {
  const filteredAds = ads.filter((ad) => {
    let result = true;
    if (filtersHousingType.value !== 'any' && ad.offer.type !== filtersHousingType.value) {
      result = false;
    }
    if (filtersHousingPrice.value !== 'any') {
      if (filtersHousingPrice.value === 'middle' && (ad.offer.price < typePrice.low || ad.offer.price > typePrice.high)) {
        result = false;
      }
      if (filtersHousingPrice.value === 'low' &&  ad.offer.price > typePrice.low) {
        result = false;
      }
      if (filtersHousingPrice.value === 'high' &&  ad.offer.price < typePrice.high) {
        result = false;
      }
    }
    if (filtersHousingRooms.value !== 'any' && ad.offer.rooms !== Number(filtersHousingRooms.value)) {
      result = false;
    }
    if (filtersHousingGuests.value !== 'any' && ad.offer.guests !== Number(filtersHousingGuests.value)) {
      result = false;
    }
    filtersHousingFeatures.forEach((feature) => {
      if (feature.checked && ad.offer.features && !ad.offer.features.includes(feature.value)) {
        result = false;
      }
    });
    return result;
  });
  setSimplePinsOnMap(filteredAds.slice(0, TOTAL_POINTS), interactiveMap);
};

const addFilters = (ads, interactiveMap) => {
  const debounced = debounce(() => onFilter(ads, interactiveMap));
  filtersHousingType.addEventListener('change', debounced);
  filtersHousingPrice.addEventListener('change', debounced);
  filtersHousingRooms.addEventListener('change', debounced);
  filtersHousingGuests.addEventListener('change', debounced);
  filtersHousingFeatures.forEach((feature) => {
    feature.addEventListener('change', debounced);
  });
};

export {addFilters, onFilter};
