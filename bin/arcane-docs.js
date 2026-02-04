#!/usr/bin/env node
import { Command } from 'commander';
import { createDevServer } from '../src/node/dev.js';
import { build } from '../src/node/build.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('arcane-docs')
  .description('Static documentation site generator with NoAIweb style')
  .version('1.0.0');

program.command('dev')
  .description('Start development server')
  .option('-p, --port <port>', 'Port to run server on', 3000)
  .action(async (options) => {
    console.log(chalk.cyan('Starting dev server...'));
    try {
      await createDevServer(process.cwd(), options);
    } catch (e) {
      console.error(chalk.red('Error starting server:'), e);
      process.exit(1);
    }
  });

program.command('build')
  .description('Build static site')
  .action(async () => {
    console.log(chalk.cyan('Building site...'));
    try {
      await build(process.cwd());
    } catch (e) {
      console.error(chalk.red('Build failed:'), e);
      process.exit(1);
    }
  });

program.parse();
