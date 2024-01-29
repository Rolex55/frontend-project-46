import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { load } from 'js-yaml';

export const toParse = (path) => {
  const pathToFile = resolve('/home/rolexoid/frontend-project-46/src', path);
  const riddenFile = readFileSync(pathToFile);
  let fileObj;
  if (extname(path) === '.json') {
    fileObj = JSON.parse(riddenFile);
  } else if (extname(path) === '.yml') {
    fileObj = load(riddenFile);
  }
  return fileObj;
};
