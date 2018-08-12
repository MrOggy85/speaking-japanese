import { getRandomInt } from './utils';
import adjectives from '../data/adjectives';

import {
  baseForms,
  adjectiveForms,
  politeLevel,
} from './forms';

const GAME_TYPE = {
  ADJECTIVES: 'ADJECTIVES',
};

function getData(gameType) {
  switch (gameType) {
    case GAME_TYPE.ADJECTIVES:
      return adjectives;
    default:
      throw new Error(`no such gameType "${gameType}"`);
  }
}

function getSubjectEng(subject, conjugation) {
  if (subject !== 'day') {
    return subject;
  }

  switch (conjugation) {
    case baseForms.PRESENT:
    case baseForms.PRESENT_NEG:
      return 'Today';
    case baseForms.PAST:
    case baseForms.PAST_NEG:
      return 'Yesterday';
    default:
      throw new Error(`conjugation "${conjugation}" not implemented english`);
  }
}

function getSubjectJap(subject, conjugation) {
  if (subject === 'shirt') {
    return 'シャツ';
  }
  if (subject === 'he') {
    return '彼';
  }
  if (subject === 'japanese') {
    return '日本語';
  }
  if (subject === 'movie') {
    return '映画';
  }
  if (subject === 'ramen') {
    return 'ラーメン';
  }
  if (subject === 'room') {
    return '部屋';
  }

  switch (conjugation) {
    case baseForms.PRESENT:
    case baseForms.PRESENT_NEG:
      return '今日';
    case baseForms.PAST:
    case baseForms.PAST_NEG:
      return '昨日';
    default:
      throw new Error(`conjugation "${conjugation}" not implemented for japanese`);
  }
}

function getQuestion(sampleSentence, conjugation, subject, politenessLevel, pronoun) {
  let beConjugated;
  switch (conjugation) {
    case baseForms.PRESENT:
    case baseForms.PRESENT_NEG:
      beConjugated = 'is';
      break;
    case baseForms.PAST:
    case baseForms.PAST_NEG:
      beConjugated = 'was';
      break;
    default:
      throw new Error(`be conjugation "${conjugation}" is not implemented`);
  }

  let polarity;
  switch (conjugation) {
    case baseForms.PRESENT:
    case baseForms.PAST:
      polarity = '';
      break;
    case baseForms.PAST_NEG:
    case baseForms.PRESENT_NEG:
      polarity = 'not';
      break;
    default:
      throw new Error(`polarity for "${conjugation}" is not implemented`);
  }

  const question = sampleSentence
    .replace('$beConjugation', beConjugated)
    .replace('$subject', subject)
    .replace('$polarity', polarity)
    .replace('$pronoun', pronoun);

  return `${question} (${politenessLevel})`;
}

function getAnswer(subject, stem, suffix, pronoun, politenessLevel) {
  let pronounJap = '';
  if (pronoun) {
    switch (pronoun) {
      case 'it':
        pronounJap = '';
        break;
      case 'that':
        pronounJap = 'その';
        break;
      case 'this':
        pronounJap = 'この';
        break;
      default:
        throw new Error(`translation for "${pronoun}" is not implemented in japanese`);
    }
  }

  const answers = [];
  answers.push(`${pronounJap}${subject}は${stem}${suffix}`);

  if (politenessLevel === politeLevel.SHORT) {
    answers.push(`${pronounJap}${subject}${stem}${suffix}`);
  }

  return answers;
}

function getChallenge(gameType, dataObject) {
  switch (gameType) {
    case GAME_TYPE.ADJECTIVES: {
      const politenessIndex = getRandomInt(2); // TODO make dynamic
      const politenessLevel = Object.values(politeLevel)[politenessIndex];

      const conjugationIndex = getRandomInt(4); // TODO make dynamic
      const conjugation = Object.values(baseForms)[conjugationIndex];

      const subjectEng = getSubjectEng(dataObject.subject, conjugation);
      const question = getQuestion(dataObject.sampleSentence, conjugation, subjectEng, politenessLevel, dataObject.pronoun);

      const subjectJap = getSubjectJap(dataObject.subject, conjugation);
      const suffix = adjectiveForms[dataObject.type][politenessLevel][conjugation];

      const answers = getAnswer(subjectJap, dataObject.stem, suffix, dataObject.pronoun, politenessLevel);

      return {
        question,
        answers,
        hint: answers[0],
      };
    }
    default:
      throw new Error(`no such gameType "${gameType}"`);
  }
}

function getNextQuestion(gameType) {
  const data = getData(gameType);

  const index = getRandomInt(data.length);
  const dataObject = data[index];

  const challenge = getChallenge(gameType, dataObject);

  // TODO declare Model
  return challenge;
}

export default {
  getNextQuestion,
};
