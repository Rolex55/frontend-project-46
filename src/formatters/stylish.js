import _ from 'lodash';

const signs = { deleted: '- ', added: '+ ', unchanged: '  ' };

const addSign = (differObject) => {
  const iter = (acc, key) => {
    if (!Object.hasOwn(differObject[key], 'changes')) {
      acc[`${signs.unchanged}${key}`] = addSign(differObject[key]);
      return { ...acc };
    }
    const keyChange = differObject[key].changes;
    switch (keyChange) {
      case 'deleted':
      case 'added':
      case 'unchanged':
        acc[`${signs[keyChange]}${key}`] = differObject[key].value;
        return { ...acc };
      case 'changed':
        acc[`${signs.deleted}${key}`] = differObject[key].value1;
        acc[`${signs.added}${key}`] = differObject[key].value2;
        return { ...acc };
      default:
        throw new Error(`Unknown changes: '${keyChange}'!`);
    }
  };
  const keys = Object.keys(differObject);
  const result = keys.reduce(iter, {});
  return { ...result };
};

const stringify = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const calcIdentFunc = (leftSpace) => {
      const indentSize = depth * spacesCount - leftSpace;
      const currentIndentFunc = replacer.repeat(indentSize);
      const indentBrackSize = (depth - 1) * spacesCount;
      const bracketIndentFunc = replacer.repeat(indentBrackSize);
      return [currentIndentFunc, bracketIndentFunc];
    };
    const [currentIndent, bracketIndent] = calcIdentFunc(2);
    const lines = Object.entries(currentValue).map(([key, val]) => {
      if (
        !key.startsWith('+')
        && !key.startsWith('-')
        && !key.startsWith(' ')
      ) {
        const newCurrentIndent = calcIdentFunc(0)[0];
        return `${newCurrentIndent}${key}: ${iter(val, depth + 1)}`;
      }
      return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, 1);
};

const stylish = (objDiff) => stringify(addSign(objDiff));

export default stylish;
