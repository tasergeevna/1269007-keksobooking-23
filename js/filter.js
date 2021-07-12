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
    if (filtersHousingType.value !== 'any' && ad.offer.type !== filtersHousingType.value) {
      return false;
    }
    if (filtersHousingPrice.value !== 'any') {
      if (filtersHousingPrice.value === 'middle' && (ad.offer.price < typePrice.low || ad.offer.price > typePrice.high)) {
        return false;
      }
      if (filtersHousingPrice.value === 'low' &&  ad.offer.price > typePrice.low) {
        return false;
      }
      if (filtersHousingPrice.value === 'high' &&  ad.offer.price < typePrice.high) {
        return false;
      }
    }
    if (filtersHousingRooms.value !== 'any' && ad.offer.rooms !== Number(filtersHousingRooms.value)) {
      return false;
    }
    if (filtersHousingGuests.value !== 'any' && ad.offer.guests !== Number(filtersHousingGuests.value)) {
      return false;
    }
    const features = ad.offer.features || [];
    for (let i = 0; i < filtersHousingFeatures.length; i++) {
      const feature = filtersHousingFeatures[i];
      if (feature.checked && features.includes(feature.value)) {
        return false;
      }
    }
    return true;
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
