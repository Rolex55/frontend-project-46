#!/usr/bin/env node
import { Command } from 'commander';
import getDiffence from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiffence(filepath1, filepath2, program.opts().format));
  });

program.parse();
