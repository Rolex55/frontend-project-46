import union from 'lodash';
import isPlainObject from 'lodash';
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
    case '.yml':
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

const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = union(obj1Keys.concat(obj2Keys)).sort();
  const getDifferObj = (acc, key) => {
    if (
      isPlainObject(obj1[key]) === true
      || isPlainObject(obj2[key]) === true
    ) {
      acc[key] = getDifference(obj1[key], obj2[key]);
    }
    if (obj1[key] !== obj2[key]) {
      if (Object.hasOwn(obj1, key)) {
        acc[`- ${key}`] = obj1[key];
      }
      if (Object.hasOwn(obj2, key)) {
        acc[`+ ${key}`] = obj2[key];
      }
    } else {
      acc[`  ${key}`] = obj1[key];
    }
    return acc;
  };
  const result = keys.reduce(getDifferObj, {});
  return result;
};

const getFormat = (obj) => {
  const str = JSON.stringify(obj, null, ' ').replace(/[",]/g, '');
  return str;
};

const genDiffFunc = (path1, path2) => {
  const [obj1, obj2] = getObjectsFromFiles(path1, path2);
  const objDiffer = getDifference(obj1, obj2);
  return getFormat(objDiffer);
};

export default genDiffFunc;
