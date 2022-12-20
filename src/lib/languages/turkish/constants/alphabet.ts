export default {
  ALL: [
    'a',
    'b',
    'c',
    'ç',
    'd',
    'e',
    'f',
    'g',
    'ğ',
    'h',
    'i',
    'ı',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'ö',
    'p',
    'r',
    's',
    'ş',
    't',
    'u',
    'ü',
    'v',
    'y',
    'z',
  ],
  VOWEL: {
    ALL: ['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü'], // ünlü, sesli harf
    MOUTH: {
      OPEN: ['a', 'e', 'o', 'ö'], // wide (geniş)
      CLOSE: ['ı', 'i', 'u', 'ü'], // narrow (dar)
    },
    LIPS: {
      UNROUNDED: ['a', 'e', 'ı', 'i'], // flat (düz)
      ROUNDED: ['o', 'ö', 'u', 'ü'], // round (yuvarlak)
    },
    TONGUE: {
      BACK: ['a', 'ı', 'o', 'u'], // thick (kalın)
      FRONT: ['e', 'i', 'ö', 'ü'], // thin (ince)
    },
  },
  CONSONANT: {
    ALL: [
      'b',
      'c',
      'd',
      'g',
      'ğ',
      'j',
      'l',
      'm',
      'n',
      'r',
      'v',
      'y',
      'z',
      'f',
      'h',
      's',
      'ş',
      'p',
      'ç',
      't',
      'k',
    ], // ünsüz, sessiz harf
    LENIS: {
      ALL: ['b', 'c', 'd', 'g', 'ğ', 'j', 'l', 'm', 'n', 'r', 'v', 'y', 'z'], // continuous, soft, yumuşak (ötümlü, tonlu)
    },
    FORTIS: {
      ALL: ['f', 'h', 's', 'ş', 'p', 'ç', 't', 'k'], // discontinuous, strong, sert (ötümsüz, tonsuz)
      CONTINUANT: ['f', 'h', 's', 'ş'], // sürekli
      NONCONTINUANT: ['p', 'ç', 't', 'k'], // süreksiz
    },
  },
};
