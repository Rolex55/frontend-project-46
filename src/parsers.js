import { readFileSync } from 'node:fs';
import { resolve, extname, dirname } from 'node:path';
import { load } from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (path) => {
  const pathToFile = resolve(__dirname, path);
  return pathToFile;
};

const toParseFile = (pathToFile) => {
  const riddenFile = readFileSync(pathToFile, 'utf-8');
  let fileObject;
  switch (extname(pathToFile)) {
    case '.json':
      fileObject = JSON.parse(riddenFile);
      break;
    case '.yml' || '.yaml':
      fileObject = load(riddenFile);
      break;
    default:
      throw new Error(
        `Unknown extension of the path: '${extname(pathToFile)}'!`,
      );
  }
  return fileObject;
};

const getObjectsFromFiles = (path1, path2) => {
  const obj1 = toParseFile(getPathToFile(path1));
  const obj2 = toParseFile(getPathToFile(path2));
  return [obj1, obj2];
};

export default getObjectsFromFiles;
