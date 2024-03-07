import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const addChanges = (acc, key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { ...acc, [key]: getDifference(obj1[key], obj2[key]) };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { ...acc, [key]: { changes: 'added', value: obj2[key] } };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { ...acc, [key]: { changes: 'deleted', value: obj1[key] } };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        ...acc,
        [key]: { changes: 'changed', value1: obj1[key], value2: obj2[key] },
      };
    }
    return { ...acc, [key]: { changes: 'unchanged', value: obj1[key] } };
  };
  const result = keys.reduce(addChanges, {});
  return result;
};

export default getDifference;
