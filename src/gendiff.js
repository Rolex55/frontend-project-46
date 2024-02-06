import _ from 'lodash';
import getObjectsFromFiles from './parsers.js';

const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.union(obj1Keys.concat(obj2Keys)).sort();
  const getDifferObj = (acc, key) => {
    if (
      _.isPlainObject(obj1[key]) === true
      || _.isPlainObject(obj2[key]) === true
    ) {
      acc[`  ${key}`] = getDifference(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
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
