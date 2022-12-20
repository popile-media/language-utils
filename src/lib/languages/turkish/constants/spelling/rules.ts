export default [
  {
    ptn: /^[aeiouöüıİ][bcçdfgğhjklmnprsştvyz][aeiouöüıİ]/i,
    len: 1,
  }, // 2.
  {
    ptn: /^[aeiouöüıİ]{2}[bcçdfgğhjklmnprsştvyz]/i,
    len: 1,
  }, // 3.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz][aeiouöüıİ]{2}/i,
    len: 2,
  }, // 4.
  {
    ptn: /^[aeiouöüıİ][bcçdfgğhjklmnprsştvyz]{2}[aeiouöüıİ]/i,
    len: 2,
  }, // 5.
  {
    ptn: /^([bcçdfgğhjklmnprsştvyz][aeiouöüıİ]){2}/i,
    len: 2,
  }, // 6.
  {
    ptn: /^[aeiouöüıİ][bcçdfgğhjklmnprsştvyz]{2}($|[bcçdfgğhjklmnprsştvyz])/i,
    len: 3,
  }, // 7.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz][aeiouöüıİ][bcçdfgğhjklmnprsştvyz]($|[bcçdfgğhjklmnprsştvyz][aeiouöüıİ])/i,
    len: 3,
  }, // 8.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz]{2}[aeiouöüıİ][bcçdfgğhjklmnprsştvyz][aeiouöüıİ]/i,
    len: 3,
  }, // 9.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz][aeiouöüıİ][bcçdfgğhjklmnprsştvyz]{2}($|[bcçdfgğhjklmnprsştvyz])/i,
    len: 4,
  }, // 10.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz]{2}[aeiouöüıİ][bcçdfgğhjklmnprsştvyz]($|[bcçdfgğhjklmnprsştvyz][aeiouöüıİ])/i,
    len: 4,
  }, // 11.
  {
    ptn: /^[bcçdfgğhjklmnprsştvyz]{2}[aeiouöüıİ][bcçdfgğhjklmnprsştvyz]{2}($|[bcçdfgğhjklmnprsştvyz])/i,
    len: 5,
  }, // 12.
];
