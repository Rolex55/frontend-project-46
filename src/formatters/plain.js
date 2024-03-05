import _ from 'lodash';

const getPathToSearchKey = (object, searchKey) => {
  const iter = (value, ancestry) => {
    if (typeof value !== 'object' || value === null) {
      return [];
    }
    if (value[searchKey] !== undefined) {
      return [...ancestry, searchKey];
    }
    const keys = Object.keys(value);
    const result = keys.flatMap((key) => {
      const newancestry = ancestry.concat(key);
      return iter(value[key], newancestry);
    });
    return result;
  };
  return iter(object, []).join('.');
};

const convertValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = ([difObj, obj1, obj2]) => {
  const iter = (diffObject) => {
    const result = Object.entries(diffObject).flatMap(([key, changes]) => {
      if (_.isArray(changes)) {
        return iter(changes[0]);
      }
      const path1 = getPathToSearchKey(obj1, key);
      const path2 = getPathToSearchKey(obj2, key);
      const value1 = convertValue(_.get(obj1, path1, 'default'));
      const value2 = convertValue(_.get(obj2, path2, 'default'));
      switch (changes) {
        case 'added':
          return `Property '${path2}' was added with value: ${value2}`;
        case 'deleted':
          return `Property '${path1}' was removed`;
        case 'changed':
          return `Property '${path1}' was updated. From ${value1} to ${value2}`;
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(difObj);
};

export default plain;
