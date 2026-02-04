import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';

export function searchPlugin(root) {
  const virtualModuleId = 'virtual:search-index';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'arcane-search',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const files = await fg('**/*.md', { 
            cwd: root, 
            ignore: ['node_modules', 'dist', '.git'] 
        });
        
        const searchIndex = await Promise.all(files.map(async file => {
          const absolutePath = path.resolve(root, file);
          const raw = await fs.readFile(absolutePath, 'utf-8');
          const { data, content } = matter(raw);
          
          const name = file.replace(/\.md$/, '');
          const pathName = name === 'README' || name === 'index' ? '/' : `/${name}`;
          
          // Simple plain text extraction for better search results
          const plainText = content
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/`[^`]*`/g, '') // Remove inline code
            .replace(/#{1,6}\s+/g, '') // Remove headers
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links keeping text
            .replace(/[*_~`]/g, '') // Remove formatting chars
            .replace(/\s+/g, ' ') // Collapse whitespace
            .trim();
            
          return {
            title: data.title || name,
            path: pathName,
            content: plainText
          };
        }));

        return `export default ${JSON.stringify(searchIndex)}`;
      }
    }
  }
}
