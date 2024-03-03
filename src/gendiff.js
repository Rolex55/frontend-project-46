import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

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

export default genDiff;
