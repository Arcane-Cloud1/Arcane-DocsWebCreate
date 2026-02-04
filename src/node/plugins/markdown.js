import MarkdownIt from "markdown-it";
import matter from "gray-matter";

const md = new MarkdownIt({ html: true });

export function markdownPlugin() {
  return {
    name: "arcane-markdown",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return;

      const { content, data } = matter(code);
      const html = md.render(content);

      return {
        code: `
<template>
  <div class="markdown-body">
    ${html}
  </div>
</template>
<script>
export default {
  frontmatter: ${JSON.stringify(data)}
}
</script>
        `,
        map: null,
      };
    },
  };
}
