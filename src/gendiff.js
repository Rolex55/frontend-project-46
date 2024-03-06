import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const addChanges = (acc, key) => {
    if (
      _.isPlainObject(obj1[key]) === true
      && _.isPlainObject(obj2[key]) === true
    ) {
      acc[key] = getDifference(obj1[key], obj2[key]);
    } else if (!Object.hasOwn(obj1, key)) {
      acc[key] = { changes: 'added', value: obj2[key] };
    } else if (!Object.hasOwn(obj2, key)) {
      acc[key] = { changes: 'deleted', value: obj1[key] };
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = { changes: 'changed', value1: obj1[key], value2: obj2[key] };
    } else {
      acc[key] = { changes: 'unchanged', value: obj1[key] };
    }
    return acc;
  };
  const result = keys.reduce(addChanges, {});
  return { ...result };
};

export default getDifference;
