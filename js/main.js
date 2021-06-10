// Точка входа

import './utils.js';
import {TOTAL_ADS, createAds} from './ads.js';

const similarAds = new Array(TOTAL_ADS).fill(null).map(createAds);
similarAds;
