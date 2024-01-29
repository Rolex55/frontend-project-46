import { toParse } from './parsing.js';

const getDiff = (path1, path2) => {
  const obj1 = toParse(path1);
  const obj2 = toParse(path2);
  console.log(obj1, obj2);
};

export default getDiff;
