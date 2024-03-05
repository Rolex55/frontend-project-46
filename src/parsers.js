import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import { load } from 'js-yaml';

const getPathToFile = (path) => resolve(cwd(), path);

const toParseFile = (pathToFile) => {
  const riddenFile = readFileSync(pathToFile, 'utf-8');
  switch (extname(pathToFile)) {
    case '.json':
      return JSON.parse(riddenFile);
    case '.yml' || '.yaml':
      return load(riddenFile);
    default:
      throw new Error(
        `Unknown extension of the path: '${extname(pathToFile)}'!`,
      );
  }
};

const parseTwoFiles = (path1, path2) => {
  const obj1 = toParseFile(getPathToFile(path1));
  const obj2 = toParseFile(getPathToFile(path2));
  return [obj1, obj2];
};

export default parseTwoFiles;
