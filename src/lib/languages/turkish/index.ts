import Utils from '../../utils';

import Constants from './constants';
import TurkishUtils from './utils';

const DEFAULT_MARK = "'";
const DEFAULT_SPELLING_DIVIDER = '\u00AD'; // soft hyphen

enum CASE_SUFFIX_TYPES {
  DATIVE,
  ABLATIVE,
  LOCATIVE,
  ACCUSATIVE,
  GENITIVE,
}

interface IOptions {
  properNoun?: boolean;
  mark?: string;
}

class Turkish {
  _word;
  _properNoun;
  _mark;
  _caseSuffix;
  _caseType: CASE_SUFFIX_TYPES;

  constructor(word: string, options?: IOptions) {
    this._word = word;
    this._properNoun =
      typeof options?.properNoun === 'undefined' ? true : options.properNoun;
    this._mark = options?.mark ?? DEFAULT_MARK;

    // @todo: support non-proper nouns
    if (this._properNoun === false) {
      throw new Error('Only proper nouns are supported in this version');
    }
  }

  /**
   * Spell word with divider
   */
  static spellingWithDivider(
    word: string,
    divider: string = DEFAULT_SPELLING_DIVIDER
  ) {
    const syllabication = (word: string, divider: string) => {
      if (word.length < 3) {
        return word;
      }

      for (const RULE of Constants.SPELLING.RULES)
        if (RULE.ptn.test(word)) {
          if (word.length > RULE.len) {
            return `${word.slice(
              0,
              RULE.len
            )}${divider}${Turkish.spellingWithDivider(
              word.slice(RULE.len),
              divider
            )}`;
          } else {
            return word;
          }
        }

      return word;
    };

    // irregular check
    for (const IRREGULAR of Constants.SPELLING.IRREGULARS) {
      const status = word
        .slice(0, IRREGULAR.word.length)
        .localeCompare(IRREGULAR.word, 'tr', { sensitivity: 'base' });

      const isIrregular = status === 0;
      const isStopIrregularSearch = status < 0;

      if (isIrregular) {
        const irregularSpelling = `${syllabication(
          word.slice(0, IRREGULAR.count),
          divider
        )}${divider}${syllabication(word.slice(IRREGULAR.count), divider)}`;

        return irregularSpelling;
      } else if (isStopIrregularSearch) {
        break;
      }
    }

    // not irregular
    return syllabication(word, divider);
  }

  /**
   * Spell word as array
   *
   * RULES:
   *
   * - Number of syllables count can be up to vowel letters count in a word.
   * - The consonant letter between two vowel letters is added together with the vowel letter that comes after it.
   * - When two consonant letters come together, the first consonant letter is spelled with the vowel before it,
   *   and the second consonant letter is spelled with the next vowel letter.
   * - When three consonant letters come together, the first and second consonant letters are spelled with the vowel before it,
   *   and the third consonant letter is spelled with the vowel letter that comes after it.
   * - When two vowel letters come together, each one forms a separate syllable.
   * - Compound words are split into syllables like a single word.
   */
  static spelling(word: string): [string] {
    return Turkish.spellingWithDivider(word).split(DEFAULT_SPELLING_DIVIDER);
  }

  /**
   * Dative case: to, toward (‑a/e/ya/ye)
   * Tr. -e hâli (yönelme hâli)
   *
   * The dative case suffix is used to show motion towards something or someone.
   * In Turkish, the dative case suffix can be used by adding the “-e/-a” to the end of a noun.
   * These suffixes equal to the prepositions “to” in English.
   *
   * RULES:
   *
   * - Words with the last vowels “a/ı/o/u” take the “-a” ending, while words with the last vowels “e/i/ö/ü” take the “-e” ending.
   * - Some words have Consonant Assimilation -alternation- when a suffix is added.
   * - If a word ends in a vowel, we insert the buffer letter “y” between the dative case suffix and the noun.
   */
  dative() {
    this._caseType = CASE_SUFFIX_TYPES.DATIVE;

    const lastLetter = Utils.letter.last(this._word);
    const spells = Turkish.spelling(this._word);
    const lastSpell = spells[spells.length - 1];

    const analyzedLastLetter = TurkishUtils.analyzeLetter(lastLetter);
    const analyzedLastSpell = TurkishUtils.analyzeWord(lastSpell);

    if (analyzedLastLetter.vowel.tongue.isFront) {
      this._caseSuffix = 'ye';
      return this;
    }

    if (analyzedLastLetter.vowel.tongue.isBack) {
      this._caseSuffix = 'ya';
      return this;
    }

    if (analyzedLastSpell.vowel.tongue.hasBack) {
      this._caseSuffix = 'a';
      return this;
    }

    this._caseSuffix = 'e';

    return this;
  }

  /**
   * Ablative case: “from” in Turkish (‑dan/den/tan/ten)
   * Tr. -den hâli (ayrılma hâli)
   *
   * We use the ablative case to talk about a point of departure, “place of which” and indicating a comparison.
   * The Turkish suffix for the ablative case is “-den/-dan/-ten/-tan” which corresponds to “from” in English.
   *
   * RULES:
   *
   * - After soft consonants -> -den/-dan
   * - After vowels -> -den/-dan
   * - After hard consonants	-> -ten/-tan
   */
  ablative() {
    this._caseType = CASE_SUFFIX_TYPES.ABLATIVE;

    const lastLetter = Utils.letter.last(this._word);
    const spells = Turkish.spelling(this._word);
    const lastSpell = spells[spells.length - 1];

    const analyzedLastLetter = TurkishUtils.analyzeLetter(lastLetter);
    const analyzedLastSpell = TurkishUtils.analyzeWord(lastSpell);

    // There is a rule called Vowel Harmony in Turkish.
    // If we check the word with the rule, we can find the middle letter of the suffix to be brought.
    // In the vowel harmony rule, we look at the first syllable,
    // but since some words are compound, we look at the last syllable to determine the next suffix.

    // true => use a in mid
    // false => use e in mid
    const isVowelBack = analyzedLastSpell.vowel.tongue.hasBack;

    // There is a rule called Consonant Hardening in Turkish.
    // If the word ends with a hard consonant, it is hardened when a soft vowel and consonant letter is opposite it.

    // true => use t in beginning
    // false => use d in beginning
    const isLastLetterFortis = analyzedLastLetter.consonant.isFortis;

    if (isLastLetterFortis && isVowelBack) this._caseSuffix = 'tan';
    if (isLastLetterFortis && !isVowelBack) this._caseSuffix = 'ten';
    if (!isLastLetterFortis && isVowelBack) this._caseSuffix = 'dan';
    if (!isLastLetterFortis && !isVowelBack) this._caseSuffix = 'den';

    return this;
  }

  /**
   * Locative case: at, in, and on (‑da/de/ta/te)
   * Tr. -de hâli (bulunma hâli)
   *
   * The Locative case is used to indicate the place where the action occurs.
   * It can also be used to indicate the time the action occurs.
   * The Locative case marker in Turkish is “-de/-da/-te/-ta” which is usually “in/at/on” in English.
   *
   * RULES:
   *
   * - After soft consonants -> -de/-da
   * - After vowels -> -de/-da
   * - After hard consonants	-> -te/-ta
   */
  locative() {
    this._caseType = CASE_SUFFIX_TYPES.LOCATIVE;

    const lastLetter = Utils.letter.last(this._word);
    const spells = Turkish.spelling(this._word);
    const lastSpell = spells[spells.length - 1];

    const analyzedLastLetter = TurkishUtils.analyzeLetter(lastLetter);
    const analyzedLastSpell = TurkishUtils.analyzeWord(lastSpell);

    // There is a rule called Vowel Harmony in Turkish.
    // If we check the word with the rule, we can find the last letter of the suffix to be brought.
    // In the vowel harmony rule, we look at the first syllable,
    // but since some words are compound, we look at the last syllable to determine the next suffix.

    // true => use a letter in last
    // false => use e letter in last
    const isVowelBack = analyzedLastSpell.vowel.tongue.hasBack;

    // There is a rule called Consonant Hardening in Turkish.
    // If the word ends with a hard consonant, it is hardened when a soft vowel and consonant letter is opposite it.

    // true => use t in beginning
    // false => use d in beginning
    const isLastLetterFortis = analyzedLastLetter.consonant.isFortis;

    if (isLastLetterFortis && isVowelBack) this._caseSuffix = 'ta';
    if (isLastLetterFortis && !isVowelBack) this._caseSuffix = 'te';
    if (!isLastLetterFortis && isVowelBack) this._caseSuffix = 'da';
    if (!isLastLetterFortis && !isVowelBack) this._caseSuffix = 'de';

    return this;
  }

  /**
   * Accusative case: the direct object ending (‑ı/i/u/ü, ‑yı/yi/yu/yü)
   * Tr. -i hâli (belirtme hâli)
   *
   * Nouns that are affected by the action of a verb use the accusative case.
   * The accusative case is used to show the definite object of a verb.
   * The accusative case can be found by answering the questions “Kimi” meaning “who” and “neyi” meaning “what”.
   *
   * RULES:
   *
   * - After words ending in vowels -> yı/yi/yu/yü
   * - After words ending in consonants -> ı/i/u/ü
   */
  accusative() {
    this._caseType = CASE_SUFFIX_TYPES.ACCUSATIVE;

    const lastLetter = Utils.letter.last(this._word);
    const spells = Turkish.spelling(this._word);
    const lastSpell = spells[spells.length - 1];

    const analyzedLastLetter = TurkishUtils.analyzeLetter(lastLetter);
    const lastSpellVowelLetter = TurkishUtils.extractVowelLetter(lastSpell);

    if (lastSpellVowelLetter === undefined) {
      return this;
    }

    const isLastLetterVowel = analyzedLastLetter.isVowel;
    const isLastLetterConsonant = analyzedLastLetter.isConsonant;

    if (isLastLetterVowel) {
      if (lastSpellVowelLetter === 'a') this._caseSuffix = 'yı';
      else if (lastSpellVowelLetter === 'e') this._caseSuffix = 'yi';
      else this._caseSuffix = 'y' + lastSpellVowelLetter;
    }

    if (isLastLetterConsonant) {
      if (lastSpellVowelLetter === 'a') this._caseSuffix = 'ı';
      else if (lastSpellVowelLetter === 'e') this._caseSuffix = 'i';
      else this._caseSuffix = lastSpellVowelLetter;
    }

    return this;
  }

  /**
   * Generate Turkish word as string
   *
   * @return  {string} Generated new Turkish word
   */
  toString() {
    let result = this._word;
    const isUper = TurkishUtils.isUpperCase(this._word);

    if (this._properNoun) {
      result += this._mark;
    }

    if (this._caseSuffix) {
      result += isUper
        ? TurkishUtils.toUpperCase(this._caseSuffix)
        : TurkishUtils.toLowerCase(this._caseSuffix);
    }

    return result;
  }
}

export default Turkish;
