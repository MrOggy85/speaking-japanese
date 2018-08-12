
export const baseForms = {
  PRESENT: 'present',
  PRESENT_NEG: 'presentNeg',
  PAST: 'past',
  PAST_NEG: 'pastNeg',
  // TODO add more forms
};

export const politeLevel = {
  SHORT: 'short',
  LONG: 'long',
  // TODO add keigo
};

export const verbForms = {
  ichidan: {
    short: {
      present: 'る',
      presentNeg: 'ない',
      past: 'た',
      pastNeg: 'なかった',
    },
    long: {
      present: 'ます',
      presentNeg: 'ません',
      past: 'ました',
      pastNeg: 'ませんでした',
    },
  },
  suru: {
    short: {
      present: 'する',
      presentNeg: 'しない',
      past: 'した',
      pastNeg: 'しなかった',
    },
    long: {
      present: 'します',
      presentNeg: 'しません',
      past: 'しました',
      pastNeg: 'しませんでした',
    },
  },
  kuru: {
    short: {
      present: 'くる',
      presentNeg: '来ない',
      past: '来た',
      pastNeg: '来なかった',
    },
    long: {
      present: '来ます',
      presentNeg: '来ません',
      past: '来ました',
      pastNeg: '来ませんでした',
    },
  },
  godanU: {
    short: {
      present: 'う',
      presentNeg: 'わない',
      past: 'った',
      pastNeg: 'わなかった',
    },
    long: {
      present: 'います',
      presentNeg: 'いません',
      past: 'いました',
      pastNeg: 'いませんでした',
    },
  },
  godanTsu: {
    short: {
      present: 'つ',
      presentNeg: 'たない',
      presentContinuous: 'っている',
      past: 'った',
      pastNeg: 'たなかった',
    },
    long: {
      present: 'います',
      presentNeg: 'いません',
      past: 'いました',
      pastNeg: 'いませんでした',
    },
  },
  godanRu: {
    short: {
      present: 'る',
      presentNeg: 'らない',
      past: 'った',
      pastNeg: 'らなかった',
    },
    long: {
      present: 'ります',
      presentNeg: 'りません',
      past: 'りました',
      pastNeg: 'りませんでした',
    },
  },
  godanBu: {
    short: {
      present: 'ぶ',
      presentNeg: 'ばない',
      past: 'んだ',
      pastNeg: 'ばなかった',
    },
    long: {
      present: 'びます',
      presentNeg: 'びません',
      past: 'びました',
      pastNeg: 'びませんでした',
    },
  },
  godanMu: {
    short: {
      present: 'む',
      presentNeg: 'まない',
      past: 'んだ',
      pastNeg: 'まなかった',
    },
    long: {
      present: 'みます',
      presentNeg: 'みません',
      past: 'みました',
      pastNeg: 'みませんでした',
    },
  },
  godanNu: {
    short: {
      present: 'ぬ',
      presentNeg: 'なない',
      past: 'んだ',
      pastNeg: 'ななかった',
    },
    long: {
      present: 'にます',
      presentNeg: 'にません',
      past: 'にました',
      pastNeg: 'にませんでした',
    },
  },
  godanSu: {
    short: {
      present: 'す',
      presentNeg: 'さない',
      past: 'した',
      pastNeg: 'さなかった',
    },
    long: {
      present: 'します',
      presentNeg: 'しません',
      past: 'しました',
      pastNeg: 'しませんでした',
    },
  },
  godanKu: {
    short: {
      present: 'く',
      presentNeg: 'かない',
      past: 'いた',
      pastNeg: 'かなかった',
    },
    long: {
      present: 'きます',
      presentNeg: 'きません',
      past: 'きました',
      pastNeg: 'きませんでした',
    },
  },
  godanGu: {
    short: {
      present: 'ぐ',
      presentNeg: 'がない',
      past: 'いだ',
      pastNeg: 'がなかった',
    },
    long: {
      present: 'ぎます',
      presentNeg: 'ぎません',
      past: 'ぎました',
      pastNeg: 'ぎませんでした',
    },
  },
};

export const adjectiveForms = {
  i: {
    short: {
      present: 'い',
      presentNeg: 'くない',
      past: 'かった',
      pastNeg: 'くなかった',
    },
    long: {
      present: 'いです',
      presentNeg: 'くないです',
      past: 'かったです',
      pastNeg: 'くなかったです',
    },
  },
  na: {
    short: {
      present: 'だ',
      presentNeg: 'じゃない',
      past: 'だった',
      pastNeg: 'じゃなかった',
    },
    long: {
      present: 'です',
      presentNeg: 'じゃないです',
      past: 'でした',
      pastNeg: 'じゃなかったです',
    },
  },
};
