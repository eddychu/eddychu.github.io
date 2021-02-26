import frontmatter from "front-matter"
import marked from 'marked';
import highlight from 'highlight.js';
import { readFile } from "fs/promises";


marked.setOptions({
    sanitize: false,
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
});
  

export async function processMarkdown(filePath) {
    let content = await readFile(filePath, 'utf-8');
    content = frontmatter(content);
    content.body = marked(content.body);
  
    const attributes = content.attributes;
    const body = content.body;
    return {...attributes, body}
}



