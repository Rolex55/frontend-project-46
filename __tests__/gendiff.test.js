import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import genDiffFunc from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff JSON-file', () => {
  const result = readFile('expectedfile12.json').replace(/[",]/g, '').trim();
  expect(
    genDiffFunc('__fixtures__/file1.json', '__fixtures__/file2.json'),
  ).toEqual(result);
});

test('genDiff YML-file', () => {
  const result = readFile('expectedfile12.yml').replace(/[",]/g, '').trim();
  expect(
    genDiffFunc('__fixtures__/file1.yml', '__fixtures__/file2.yml'),
  ).toEqual(result);
});
