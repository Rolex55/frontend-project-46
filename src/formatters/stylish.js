import _ from 'lodash';

const signs = { deleted: '- ', added: '+ ', unchanged: '  ' };

const addSign = ([comrapeObj, obj1, obj2]) => {
  const iter = (acc, key) => {
    if (typeof comrapeObj[key] === 'object') {
      acc[`${signs.unchanged}${key}`] = addSign([...comrapeObj[key]]);
      return acc;
    }
    // eslint-disable-next-line default-case
    switch (comrapeObj[key]) {
      case 'deleted':
        acc[`${signs.deleted}${key}`] = obj1[key];
        return acc;
      case 'added':
        acc[`${signs.added}${key}`] = obj2[key];
        return acc;
      case 'unchanged':
        acc[`${signs.unchanged}${key}`] = obj1[key];
        return acc;
      case 'changed':
        acc[`${signs.deleted}${key}`] = obj1[key];
        acc[`${signs.added}${key}`] = obj2[key];
        return acc;
      default:
        throw new Error(`Unknown changes: '${comrapeObj[key]}'!`);
    }
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
    const leftSpace = 2;
    let [currentIndent, bracketIndent] = getIndent(leftSpace);
    const lines = Object.entries(currentValue).map(([key, val]) => {
      if (
        !key.startsWith('+')
        && !key.startsWith('-')
        && !key.startsWith(' ')
      ) {
        const newleftSpace = 0;
        [currentIndent, bracketIndent] = getIndent(newleftSpace);
      }
      return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (objDiff) => stringify(addSign(objDiff));

export default stylish;
