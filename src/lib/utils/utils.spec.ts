import test from 'ava';

import Utils from './index';

test('letter.first', (t) => {
  t.is(Utils.letter.first('hello'), 'h');
});

test('letter.last', (t) => {
  t.is(Utils.letter.last('hello'), 'o');
});
