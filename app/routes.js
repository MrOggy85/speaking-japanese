import Home from './pages/Home.vue';
import GameContainer from './pages/GameContainer.vue';
import Settings from './pages/Settings.vue';
import AnswerByWriting from './pages/AnswerByWriting';

import { getBaseUrl } from './utils/utils';
const BASE_URL = getBaseUrl();

export default {
  [`${BASE_URL}/`]: Home,
  [`${BASE_URL}/play`]: GameContainer,
  [`${BASE_URL}/write`]: AnswerByWriting,
  [`${BASE_URL}/settings`]: Settings,
};
