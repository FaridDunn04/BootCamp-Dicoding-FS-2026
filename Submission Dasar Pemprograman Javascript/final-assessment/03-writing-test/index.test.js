import test from 'node:test';
import assert from 'node:assert';

import { sum } from './index.js';

test('sum mengembalikan hasil yang benar untuk dua bilangan positif', () => {
	assert.strictEqual(sum(2, 3), 5);
});

test('sum mengembalikan hasil yang benar ketika salah satu bilangan negatif', () => {
	assert.strictEqual(sum(-2, 3), 1);
});

test('sum mengembalikan nol ketika kedua bilangan bernilai nol', () => {
	assert.strictEqual(sum(0, 0), 0);
});
