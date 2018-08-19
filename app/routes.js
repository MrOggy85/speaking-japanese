import Home from './pages/Home.vue';
import GameContainer from './pages/GameContainer.vue';
import { baseUrl } from '../vue.config';

export default {
  [`${baseUrl}/`]: Home,
  [`${baseUrl}/play`]: GameContainer,
};
