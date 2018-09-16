import request from './request';

async function getNextQuestion(gameType) {
  const {
    VUE_APP_API_ENDPOINT,
  } = process.env;
  const challenge = await request.get({ endpoint: `${VUE_APP_API_ENDPOINT}/game/${gameType}/next` });

  return challenge;
}

export default {
  getNextQuestion,
};
