import _ from 'lodash';
import getObjectsFromFiles from './parsers.js';
import stylish from './stylish.js';

const genDiff = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.union(obj1Keys, obj2Keys).sort();

  const getDifferObj = (acc, key) => {
    if (
      _.isPlainObject(obj1[key]) === true
      && _.isPlainObject(obj2[key]) === true
    ) {
      acc[key] = genDiff(obj1[key], obj2[key]);
    } else if (!Object.hasOwn(obj1, key)) {
      acc[key] = 'added';
    } else if (!Object.hasOwn(obj2, key)) {
      acc[key] = 'deleted';
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = 'changed';
    } else {
      acc[key] = 'unchanged';
    }
    return acc;
  };
  const result = keys.reduce(getDifferObj, {});
  return [result, obj1, obj2];
};

const genDiffFunc = (path1, path2, formatter = stylish) => {
  const [obj1, obj2] = getObjectsFromFiles(path1, path2);
  const objDiffer = genDiff(obj1, obj2);
  return formatter(objDiffer);
};

export default genDiffFunc;
