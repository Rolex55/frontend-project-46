import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff JSON-file, stylish-format', () => {
  const result = readFile('expectedfile12.json').replace(/[",]/g, '').trim();
  expect(
    getDifference('__fixtures__/file1.json', '__fixtures__/file2.json'),
  ).toEqual(result);
});

test('genDiff YML-file, stylish-format', () => {
  const result = readFile('expectedfile12.json').replace(/[",]/g, '').trim();
  expect(
    getDifference('__fixtures__/file1.yml', '__fixtures__/file2.yml'),
  ).toEqual(result);
});

test('genDiff plain-format', () => {
  const result = readFile('expectedfile12plain.txt');
  expect(
    getDifference('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain'),
  ).toEqual(result);
});

test('genDiff json-format', () => {
  const result = readFile('expected.json.txt');
  expect(
    getDifference('__fixtures__/file1.json', '__fixtures__/file2.json', 'json'),
  ).toEqual(result);
});
