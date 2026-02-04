import fg from 'fast-glob';
import path from 'path';

export function routesPlugin(root, clientRoot) {
  const virtualModuleId = 'virtual:routes';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'arcane-routes',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const tutorialDir = path.resolve(root, 'tutorial');
        const files = await fg('**/*.md', { 
            cwd: tutorialDir, 
            ignore: ['node_modules', 'dist', '.git'] 
        });
        
        const routes = files.map(file => {
          const name = file.replace(/\.md$/, '');
          const pathName = name === 'README' || name === 'index' ? '/' : `/${name}`;
          const componentPath = path.resolve(tutorialDir, file).replace(/\\/g, '/');
          
          return `
            {
              path: '${pathName}',
              component: () => import('${componentPath}')
            }
          `;
        });

        const layoutPath = path.resolve(clientRoot, 'theme/LayoutDark.vue').replace(/\\/g, '/');

        return `
          import Layout from '${layoutPath}'
          
          export default [
            {
              path: '/',
              component: Layout,
              children: [
                ${routes.join(',\n')}
              ]
            }
          ]
        `;
      }
    }
  }
}
