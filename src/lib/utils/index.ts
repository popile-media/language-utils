export default {
  letter: {
    first: (word: string) => {
      return word[0];
    },
    last: (word: string) => {
      return word[word.length - 1];
    },
  },
};
