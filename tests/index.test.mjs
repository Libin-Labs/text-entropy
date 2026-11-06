import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('balanced binary symbols have one bit', () => {
  assert.equal(api.shannonEntropy('abab').bitsPerSymbol, 1);
});
test('uniform four-symbol alphabet has two bits', () => {
  assert.equal(api.shannonEntropy('abcd').bitsPerSymbol, 2);
});
test('constant string has zero entropy', () => {
  assert.equal(api.shannonEntropy('aaaa').totalBits, 0);
});
test('counts code points rather than UTF-16 units', () => {
  assert.deepEqual(api.shannonEntropy('🌍🌍'), {
    symbols: 2,
    distinct: 1,
    bitsPerSymbol: 0,
    totalBits: 0,
  });
});
test('empty input is zero-valued', () => {
  assert.deepEqual(api.shannonEntropy(''), {
    symbols: 0,
    distinct: 0,
    bitsPerSymbol: 0,
    totalBits: 0,
  });
});
test('rejects unsupported logarithm base', () => {
  assert.throws(() => api.shannonEntropy('x', 10), RangeError);
});
