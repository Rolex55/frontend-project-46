import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import parseFile from './parsers.js';
import getFormat from './formatters/index.js';
import getDifference from './gendiff.js';

const getPathToFile = (path) => resolve(cwd(), path);
const readingFile = (pathToFile) => readFileSync(pathToFile, 'utf-8');
const getExtname = (path) => extname(path).substring(1);

export default (path1, path2, formatName = 'stylish') => {
  const [file1, file2] = [
    readingFile(getPathToFile(path1)),
    readingFile(getPathToFile(path2)),
  ];
  const [extFile1, extFile2] = [getExtname(path1), getExtname(path2)];
  const [obj1, obj2] = [parseFile(file1, extFile1), parseFile(file2, extFile2)];
  const objDiffer = getDifference(obj1, obj2);
  return getFormat(objDiffer, formatName);
};
