import _ from 'lodash';

const addSign = ([comrapeObj, obj1, obj2]) => {
  let sign = '';
  let value;
  const iter = (acc, key) => {
    if (typeof comrapeObj[key] === 'object') {
      sign = '  ';
      acc[`${sign}${key}`] = addSign([...comrapeObj[key]]);
      return acc;
    }
    // eslint-disable-next-line default-case
    switch (comrapeObj[key]) {
      case 'deleted':
        sign = '- ';
        value = obj1[key];
        break;
      case 'added':
        sign = '+ ';
        value = obj2[key];
        break;
      case 'unchanged':
        sign = '  ';
        value = obj1[key];
        break;
      case 'changed':
        sign = '- ';
        value = obj1[key];
        acc[`${sign}${key}`] = value;
        sign = '+ ';
        value = obj2[key];
        break;
      default:
        throw new Error(`Unknown changes: '${comrapeObj[key]}'!`);
    }
    acc[`${sign}${key}`] = value;
    return acc;
  };
  const keys = Object.keys(comrapeObj);
  const result = keys.reduce(iter, {});
  return result;
};

const stringify = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const getIndent = (leftSpace) => {
      const indentSize = depth * spacesCount - leftSpace;
      const currentIndentFunc = replacer.repeat(indentSize);
      const indentBrackSize = (depth - 1) * spacesCount;
      const bracketIndentFunc = replacer.repeat(indentBrackSize);
      return [currentIndentFunc, bracketIndentFunc];
    };
    let [currentIndent, bracketIndent] = getIndent(2);
    const lines = Object.entries(currentValue).map(([key, val]) => {
      if (
        !key.startsWith('+')
        && !key.startsWith('-')
        && !key.startsWith(' ')
      ) {
        [currentIndent, bracketIndent] = getIndent(0);
      }
      return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (objDiff) => {
  const result = stringify(addSign(objDiff));
  return result;
};

export default stylish;
