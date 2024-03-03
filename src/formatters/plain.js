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
      let path1;
      let value1;
      let path2;
      let value2;
      switch (changes) {
        case 'added':
          path2 = getPathToSearchKey(obj2, key);
          value2 = convertValue(_.get(obj2, path2));
          return `Property '${path2}' was added with value: ${value2}`;
        case 'deleted':
          path1 = getPathToSearchKey(obj1, key);
          return `Property '${path1}' was removed`;
        case 'changed':
          path1 = getPathToSearchKey(obj1, key);
          value1 = convertValue(_.get(obj1, path1));
          value2 = convertValue(_.get(obj2, path1));
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
