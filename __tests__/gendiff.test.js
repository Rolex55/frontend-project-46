import { readFileSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getPath(filename), 'utf-8');

test.each([
  ['stylish', 'expected.stylish.txt'],
  ['plain', 'expected.plain.txt'],
  ['json', 'expected.json.txt'],
])('JSON-file fromat %s', (format, result) => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), format)).toEqual(
    readFile(result).trim(),
  );
});

test.each([
  ['stylish', 'expected.stylish.txt'],
  ['plain', 'expected.plain.txt'],
  ['json', 'expected.json.txt'],
])('YML-file fromat %s', (format, result) => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yml'), format)).toEqual(
    readFile(result).trim(),
  );
});
