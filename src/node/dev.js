import { createServer } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { markdownPlugin } from './plugins/markdown.js';
import { routesPlugin } from './plugins/routes.js';
import { searchPlugin } from './plugins/search.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_ROOT = path.resolve(__dirname, '../client');

export async function createDevServer(root, options) {
  const server = await createServer({
    root: CLIENT_ROOT,
    plugins: [
      markdownPlugin(),
      routesPlugin(root, CLIENT_ROOT),
      searchPlugin(root),
      pluginVue({
        include: [/\.vue$/, /\.md$/]
      })
    ],
    server: {
      port: options.port
    },
    resolve: {
        alias: {
            '@': root
        }
    }
  });
  
  await server.listen();
  console.log(chalk.green(`\n  Dev server running at:\n`));
  server.printUrls();
}
