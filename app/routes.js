import Home from './pages/Home.vue';
import GameContainer from './pages/GameContainer.vue';

const { BASE_URL } = process.env;

export default {
  [`${BASE_URL}/`]: Home,
  [`${BASE_URL}/play`]: GameContainer,
};
