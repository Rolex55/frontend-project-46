import { toParse } from './parsing.js';
import union from 'lodash';
import isObject from 'lodash';

const getObjects = (path1, path2) => {
  const obj1 = toParse(path1);
  const obj2 = toParse(path2);
  return [obj1, obj2];
};

const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = union(obj1Keys.concat(obj2Keys)).sort();
  const getNewObj = (acc, key) => {
    //if (isObject(obj1[key]) || isObject(obj2[key])) {
    //acc[key] = getDifference(obj1[key], obj2[key]);
    //}
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
  const result = keys.reduce(getNewObj, {});
  return result;
};

const getFormat = (obj) => {
  const str = JSON.stringify(obj, null, ' ').replace(/[",]/g, '');
  return str;
};

const genDiffFunc = (path1, path2) => {
  const [obj1, obj2] = getObjects(path1, path2);
  const objDiffer = getDifference(obj1, obj2);
  return getFormat(objDiffer);
};

export { genDiffFunc };
