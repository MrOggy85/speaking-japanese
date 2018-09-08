import Home from './pages/Home.vue';
import GameContainer from './pages/GameContainer.vue';

import { getBaseUrl } from './utils/utils';
const BASE_URL = getBaseUrl();

export default {
  [`${BASE_URL}/`]: Home,
  [`${BASE_URL}/play`]: GameContainer,
};
