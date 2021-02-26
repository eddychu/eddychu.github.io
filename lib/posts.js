import {readdir, lstat, readFile} from "fs/promises"
import path from "path"
import frontmatter from "front-matter"
import marked from 'marked';
import highlight from 'highlight.js';

marked.setOptions({
    highlight: function (code, lang, _callback) {
        if(highlight.getLanguage(lang)) {
            return highlight.highlight(lang, code).value;
        } else {
            return highlight.highlightAuto(code).value;
        }
     
    }
  });


const PostsDirectory = "_posts"

export function createFileNode(filePath , content, isIndex = false ) {
    return {
        type: "file",
        path: filePath,
        content,
        isIndex,
    }
}

export function createFolderNode(folderPath) {
    return {
        type: "folder",
        path: folderPath,
        children: []
    }
}

export function markdownParse(content) {
    content = frontmatter(content)
    content.body = marked(content.body);
    content.attributes.date = content.attributes.date.toString();
    return content;
}


export function getTitleFromChildren(fileNodes) {
    const result = fileNodes.find((node) => node.isIndex === true);
    return result.content.attributes.title;
}

export async function collect(folder = PostsDirectory, rootNode) {
    let content = rootNode ? rootNode : createFolderNode("/");
    try {
        const files = await readdir(path.resolve(folder));
        for await (const file of files)
        {
            const filePath = path.join(folder, file)
            const stat = await lstat(filePath);
            if(stat.isFile()) {
                const isIndex = file === "index.md"? true : false;
                const body = await readFile(filePath, "utf-8");
                const parsed = markdownParse(body);
                const realPath = file.replace(/\.md$/, '')
                content.children.push(createFileNode(realPath, parsed, isIndex))
            } else {
                let newNode = createFolderNode(file);
                content.children.push(newNode)
                await collect(filePath, newNode)
            }
        }
        return content;
    } catch(err) {
        console.error(err);
    }
}

export async function getSingle(path, slug = "index.html") {
    const tree = await collect();
    const list = tree.children;
    const single = list.find((item) => item.path === path)
    const realSlug = slug.replace(/\.html$/, '')
    const file = single.children.find((f) => f.path === realSlug);
    return file;
}

export async function getList() {
    const tree = await collect();
    const list = tree.children;
    return list.map((item) => ({path: item.path, title: getTitleFromChildren(item.children)}));
}

