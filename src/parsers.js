import { load } from 'js-yaml';

const parseFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml' || 'yaml':
      return load(file);
    default:
      throw new Error(`Unknown extension: '${format}'!`);
  }
};

export default parseFile;
