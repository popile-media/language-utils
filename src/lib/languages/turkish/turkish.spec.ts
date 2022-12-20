import test from 'ava';

import TurkishUtils from './utils';

import Turkish from './index';

test('spelling', (t) => {
  // The consonant letter between two vowel letters is added together with the vowel letter that comes after it.
  t.deepEqual(Turkish.spelling('Misal'), ['Mi', 'sal']);
  t.deepEqual(Turkish.spelling('Kabile'), ['Ka', 'bi', 'le']);
  t.deepEqual(Turkish.spelling('Sinema'), ['Si', 'ne', 'ma']);
  t.deepEqual(Turkish.spelling('Mücadele'), ['Mü', 'ca', 'de', 'le']);
  t.deepEqual(Turkish.spelling('Kurabiye'), ['Ku', 'ra', 'bi', 'ye']);

  // When two consonant letters come together, the first consonant letter is spelled with the vowel before it,
  // and the second consonant letter is spelled with the next vowel letter.
  t.deepEqual(Turkish.spelling('Bardak'), ['Bar', 'dak']);
  t.deepEqual(Turkish.spelling('Hoşnut'), ['Hoş', 'nut']);
  t.deepEqual(Turkish.spelling('İstasyon'), ['İs', 'tas', 'yon']);
  t.deepEqual(Turkish.spelling('Toptancı'), ['Top', 'tan', 'cı']);
  t.deepEqual(Turkish.spelling('Hoşsohbet'), ['Hoş', 'soh', 'bet']);

  // When three consonant letters come together, the first and second consonant letters are spelled with the vowel before it,
  // and the third consonant letter is spelled with the vowel letter that comes after it.
  t.deepEqual(Turkish.spelling('Endüstri'), ['En', 'düs', 'tri']);
  t.deepEqual(Turkish.spelling('Apartman'), ['A', 'part', 'man']);
  t.deepEqual(Turkish.spelling('Sürpriz'), ['Sürp', 'riz']);
  t.deepEqual(Turkish.spelling('Denklik'), ['Denk', 'lik']);
  t.deepEqual(Turkish.spelling('Bandrol'), ['Band', 'rol']);

  // When two vowel letters come together, each one forms a separate syllable.
  t.deepEqual(Turkish.spelling('Saat'), ['Sa', 'at']);
  t.deepEqual(Turkish.spelling('Şair'), ['Şa', 'ir']);
  t.deepEqual(Turkish.spelling('Muaf'), ['Mu', 'af']);
  t.deepEqual(Turkish.spelling('Daima'), ['Da', 'i', 'ma']);
  t.deepEqual(Turkish.spelling('Realite'), ['Re', 'a', 'li', 'te']);

  // Compound words are split into syllables like a single word.
  t.deepEqual(Turkish.spelling('İlkokul'), ['İl', 'ko', 'kul']);
  t.deepEqual(Turkish.spelling('Kardanadam'), ['Kar', 'da', 'na', 'dam']);
  t.deepEqual(Turkish.spelling('Yeşilay'), ['Ye', 'şi', 'lay']);
  t.deepEqual(Turkish.spelling('Denizaltı'), ['De', 'ni', 'zal', 'tı']);
  t.deepEqual(Turkish.spelling('Kavuniçi'), ['Ka', 'vu', 'ni', 'çi']);
});

test('spelling with divider', (t) => {
  t.is(Turkish.spellingWithDivider('Misal'), 'Mi\u00ADsal');
  t.is(Turkish.spellingWithDivider('Kabile', '+'), 'Ka+bi+le');
});

test('miscellaneous', (t) => {
  // check mark
  t.is(new Turkish('Ayşe', { mark: '-' }).dative().toString(), 'Ayşe-ye');

  // check upper case
  t.is(new Turkish('AYŞE').dative().toString(), "AYŞE'YE");
});

test('utils', (t) => {
  t.is(TurkishUtils.isUpperCase('BU BİR DENEME YAZISIDIR'), true);
  t.is(TurkishUtils.isUpperCase('bu bir deneme yazısıdır'), false);
  t.is(TurkishUtils.isUpperCase('Bu Bir Deneme Yazısıdır'), false);

  t.is(TurkishUtils.isLowerCase('BU BİR DENEME YAZISIDIR'), false);
  t.is(TurkishUtils.isLowerCase('bu bir deneme yazısıdır'), true);
  t.is(TurkishUtils.isLowerCase('Bu Bir Deneme Yazısıdır'), false);

  t.is(
    TurkishUtils.toUpperCase('bu bir deneme yazısıdır'),
    'BU BİR DENEME YAZISIDIR'
  );
  t.is(
    TurkishUtils.toLowerCase('BU BİR DENEME YAZISIDIR'),
    'bu bir deneme yazısıdır'
  );

  t.is(TurkishUtils.extractVowelLetter('deneme'), 'e');
  t.is(TurkishUtils.extractVowelLetter('DENEME'), 'e');
  t.is(TurkishUtils.extractVowelLetter('123'), undefined);

  t.deepEqual(TurkishUtils.analyzeLetter('b'), {
    isVowel: false,
    isConsonant: true,
    vowel: {
      tongue: { isBack: false, isFront: false },
      mouth: { isOpen: false, isClose: false },
      lips: { isRounded: false, isUnrounded: false },
    },
    consonant: {
      isFortis: false,
      isLenis: true,
      fortis: { isContinuant: false, isNonContinuant: false },
    },
  });
  t.deepEqual(TurkishUtils.analyzeLetter('U'), {
    isVowel: true,
    isConsonant: false,
    vowel: {
      tongue: { isBack: true, isFront: false },
      mouth: { isOpen: false, isClose: true },
      lips: { isRounded: true, isUnrounded: false },
    },
    consonant: {
      isFortis: false,
      isLenis: false,
      fortis: { isContinuant: false, isNonContinuant: false },
    },
  });

  t.deepEqual(TurkishUtils.analyzeWord('deneme'), {
    vowel: {
      tongue: { hasBack: false, hasFront: true },
      mouth: { hasOpen: true, hasClose: false },
      lips: { hasRounded: false, hasUnrounded: true },
    },
  });

  t.is(TurkishUtils.matchCase('Foo', 'bar'), 'Bar');
});

test('dative case', (t) => {
  // proper nouns
  t.is(new Turkish('Osman').dative().toString(), "Osman'a");
  t.is(new Turkish('Mehmet').dative().toString(), "Mehmet'e");
  t.is(new Turkish('Ali').dative().toString(), "Ali'ye");
  t.is(new Turkish('Fatma').dative().toString(), "Fatma'ya");
});

test('ablative case', (t) => {
  // proper nouns
  t.is(new Turkish('Ali').ablative().toString(), "Ali'den");
  t.is(new Turkish('Fatma').ablative().toString(), "Fatma'dan");
  t.is(new Turkish('Fatih').ablative().toString(), "Fatih'ten");
  t.is(new Turkish('Anat').ablative().toString(), "Anat'tan");
});

test('locative case', (t) => {
  // proper nouns
  t.is(new Turkish('Ali').locative().toString(), "Ali'de");
  t.is(new Turkish('Fatma').locative().toString(), "Fatma'da");
  t.is(new Turkish('Fatih').locative().toString(), "Fatih'te");
  t.is(new Turkish('Anat').locative().toString(), "Anat'ta");
});

test('accusative case', (t) => {
  // proper nouns
  t.is(new Turkish('Anat').accusative().toString(), "Anat'ı");
  t.is(new Turkish('Fatih').accusative().toString(), "Fatih'i");
  t.is(new Turkish('Umut').accusative().toString(), "Umut'u");
  t.is(new Turkish('Abdül').accusative().toString(), "Abdül'ü");
  t.is(new Turkish('Ali').accusative().toString(), "Ali'yi");
  t.is(new Turkish('Fatma').accusative().toString(), "Fatma'yı");
  t.is(new Turkish('Arzu').accusative().toString(), "Arzu'yu");
  t.is(new Turkish('Döndü').accusative().toString(), "Döndü'yü");
});
