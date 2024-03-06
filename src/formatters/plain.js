import _ from 'lodash';

const convertValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (compareObj) => {
  const iter = (obj, path) => {
    const result = Object.entries(obj).flatMap(([key, value]) => {
      const newPath = path.concat(key);
      const newPathStr = newPath.join('.');
      if (!Object.hasOwn(value, 'changes')) {
        return iter(value, newPath);
      }
      switch (value.changes) {
        case 'added':
          return `Property '${newPathStr}' was added with value: ${convertValue(
            value.value,
          )}`;
        case 'deleted':
          return `Property '${newPathStr}' was removed`;
        case 'changed':
          return `Property '${newPathStr}' was updated. From ${convertValue(
            value.value1,
          )} to ${convertValue(value.value2)}`;
        case 'unchanged':
          newPath.splice(0, -1);
          return [];
        default:
          return [];
      }
    });
    return result.join('\n');
  };
  return iter(compareObj, []);
};

export default plain;
