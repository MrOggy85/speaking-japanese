import Home from './pages/Home.vue';
import GameContainer from './pages/GameContainer.vue';
import Settings from './pages/Settings.vue';

import { getBaseUrl } from './utils/utils';
const BASE_URL = getBaseUrl();
console.log('routes', BASE_URL);

export default {
  [`${BASE_URL}/`]: Home,
  [`${BASE_URL}/play`]: GameContainer,
  [`${BASE_URL}/settings`]: Settings,
};
