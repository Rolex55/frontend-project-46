import parseTwoFiles from './parsers.js';
import getFormat from './formatters/index.js';
import getDifference from './gendiff.js';

export default (path1, path2, formatName = 'stylish') => {
  const [obj1, obj2] = parseTwoFiles(path1, path2);
  const objDiffer = getDifference(obj1, obj2);
  return getFormat(objDiffer, formatName);
};
