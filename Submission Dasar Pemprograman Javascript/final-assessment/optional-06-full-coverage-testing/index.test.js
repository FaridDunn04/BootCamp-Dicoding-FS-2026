import test from 'node:test';
import assert from 'node:assert';

import sum from './index.js';

test('mengembalikan hasil yang benar untuk dua bilangan positif', () => {
	assert.strictEqual(sum(2, 3), 5);
});

test('mengembalikan nol ketika a bernilai negatif', () => {
	assert.strictEqual(sum(-1, 3), 0);
});

test('mengembalikan nol ketika b bernilai negatif', () => {
	assert.strictEqual(sum(4, -2), 0);
});

test('mengembalikan nol ketika kedua input bernilai negatif', () => {
	assert.strictEqual(sum(-4, -2), 0);
});

test('mengembalikan nol ketika a bukan angka', () => {
	assert.strictEqual(sum('2', 3), 0);
});

test('mengembalikan nol ketika b bukan angka', () => {
	assert.strictEqual(sum(2, '3'), 0);
});

test('mengembalikan nol ketika kedua input bukan angka', () => {
	assert.strictEqual(sum('2', '3'), 0);
});

test('mengembalikan hasil yang benar ketika kedua input bernilai nol', () => {
	assert.strictEqual(sum(0, 0), 0);
});
