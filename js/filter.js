import {filtersHousingType, filtersHousingPrice, filtersHousingRooms, filtersHousingGuests, filtersHousingFeatures} from './form.js';
import { setSimplePinsOnMap } from './map.js';
import {TOTAL_POINTS} from './api.js';
import {debounce} from './utils.js';

const onFilter = (ads, interactiveMap) => {
  const filteredAds = ads.filter((ad) => {
    let result = true;
    if (filtersHousingType.value !== 'any' && ad.offer.type !== filtersHousingType.value) {
      result = false;
    }
    if (filtersHousingPrice.value !== 'any') {
      switch(filtersHousingPrice.value) {
        case 'middle': {
          return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        }
        case 'low': {
          return ad.offer.price < 10000;
        }
        case 'high': {
          return ad.offer.price > 50000;
        }
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


/*


const sameType = ads.filter(() => {

});

const samePrice = ads.filter(() => {

});


const sameRooms = ads.filter(() => {

});

const sameGuests = ads.filter(() => {

});

const similarAds = [
  ...sameType,
  ...samePrice,
  ...sameRooms,
  ...sameGuests,
];


const getAdsRank = (ads) => {
  let rank = 0;
  if (ads. === coatColorInput.value) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColorInput.value) {
    rank += 1;
  }
}

*/

