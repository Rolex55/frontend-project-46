import plain from './plain.js';
import stylish from './stylish.js';

const getFormat = (data, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      return `Unknown formatter ${formatter}`;
  }
};

export default getFormat;
