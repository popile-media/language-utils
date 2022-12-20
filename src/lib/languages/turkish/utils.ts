import Constants from './constants';

const toUpperCase = (w: string) => w.toLocaleUpperCase('tr-TR');
const toLowerCase = (w: string) => w.toLocaleLowerCase('tr-TR');

const isUpperCase = (w: string) => toUpperCase(w) === w;
const isLowerCase = (w: string) => toLowerCase(w) === w;

export default {
  toUpperCase,
  toLowerCase,
  isUpperCase,
  isLowerCase,
  analyzeLetter: (l: string) => {
    return {
      isVowel: Constants.ALPHABET.VOWEL.ALL.includes(l.toLowerCase()),
      isConsonant: Constants.ALPHABET.CONSONANT.ALL.includes(l.toLowerCase()),
      vowel: {
        tongue: {
          isBack: Constants.ALPHABET.VOWEL.TONGUE.BACK.includes(
            l.toLowerCase()
          ),
          isFront: Constants.ALPHABET.VOWEL.TONGUE.FRONT.includes(
            l.toLowerCase()
          ),
        },
        mouth: {
          isOpen: Constants.ALPHABET.VOWEL.MOUTH.OPEN.includes(l.toLowerCase()),
          isClose: Constants.ALPHABET.VOWEL.MOUTH.CLOSE.includes(
            l.toLowerCase()
          ),
        },
        lips: {
          isRounded: Constants.ALPHABET.VOWEL.LIPS.ROUNDED.includes(
            l.toLowerCase()
          ),
          isUnrounded: Constants.ALPHABET.VOWEL.LIPS.UNROUNDED.includes(
            l.toLowerCase()
          ),
        },
      },
      consonant: {
        isFortis: Constants.ALPHABET.CONSONANT.FORTIS.ALL.includes(
          l.toLowerCase()
        ),
        isLenis: Constants.ALPHABET.CONSONANT.LENIS.ALL.includes(
          l.toLowerCase()
        ),
        fortis: {
          isContinuant: Constants.ALPHABET.CONSONANT.FORTIS.CONTINUANT.includes(
            l.toLowerCase()
          ),
          isNonContinuant:
            Constants.ALPHABET.CONSONANT.FORTIS.NONCONTINUANT.includes(
              l.toLowerCase()
            ),
        },
      },
    };
  },
  analyzeWord: (w: string) => {
    return {
      vowel: {
        tongue: {
          hasBack: !!Constants.ALPHABET.VOWEL.TONGUE.BACK.find((l) =>
            w.includes(l.toLowerCase())
          ),
          hasFront: !!Constants.ALPHABET.VOWEL.TONGUE.FRONT.find((l) =>
            w.includes(l.toLowerCase())
          ),
        },
        mouth: {
          hasOpen: !!Constants.ALPHABET.VOWEL.MOUTH.OPEN.find((l) =>
            w.includes(l.toLowerCase())
          ),
          hasClose: !!Constants.ALPHABET.VOWEL.MOUTH.CLOSE.find((l) =>
            w.includes(l.toLowerCase())
          ),
        },
        lips: {
          hasRounded: !!Constants.ALPHABET.VOWEL.LIPS.ROUNDED.find((l) =>
            w.includes(l.toLowerCase())
          ),
          hasUnrounded: !!Constants.ALPHABET.VOWEL.LIPS.UNROUNDED.find((l) =>
            w.includes(l.toLowerCase())
          ),
        },
      },
    };
  },
  extractVowelLetter: (w: string) =>
    w
      .split('')
      .find((_w) => Constants.ALPHABET.VOWEL.ALL.includes(_w.toLowerCase()))
      ?.toLowerCase(),
  matchCase: (sourceWord: string, targetWord: string) => {
    let result = '';

    sourceWord.split('').forEach((letter, index) => {
      if (isLowerCase(letter)) {
        result += toLowerCase(targetWord[index]);
      } else if (isUpperCase(letter)) {
        result += toUpperCase(targetWord[index]);
      } else {
        result += targetWord[index];
      }
    });

    if (targetWord.length > sourceWord.length) {
      result += targetWord
        .split('')
        .reverse()
        .join('')
        .slice(0, targetWord.length - sourceWord.length);
    }

    return result;
  },
};
