import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormat = (data, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    case 'json':
      return json(data);
    default:
      return `Unknown formatter ${formatter}`;
  }
};

export default getFormat;
