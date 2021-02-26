import path from "path"
import { processMarkdown } from "./processor.mjs";
import fs from "fs-extra";
import pug from "pug"
const {ensureDir, writeFile, readdir, lstat} = fs;

const CONTENT_DIRECTORY = "content"
const TEMPLATE_DIRECTORY = "template"
const OUTPUT_DIRECTORY = "docs"
const SITE_CONFIG = {
    site: {
        author: "Eddy Chu",
        title: "Connecting Dots"
    }
}

export function render(template, data) {
    return pug.renderFile(template, data);
}

export function createFileNode(filePath, content, isIndex = false) {
    return {
        type: "file",
        path: filePath,
        isIndex,
        content
    }
}

export function createFolderNode(folderPath) {
    return {
        type: "folder",
        path: folderPath,
        children: []
    }
}


export function getTitleFromChildren(fileNodes) {
    const result = fileNodes.find((node) => node.isIndex === true);
    return result.content.title;
}



export async function buildTree(folder, rootNode) {
    let content = rootNode ? rootNode : createFolderNode("/");
   
    try {
        const files = await readdir(path.resolve(folder));
        for await (const file of files)
        {
            const filePath = path.join(folder, file)
            const stat = await lstat(filePath);
            if(stat.isFile()) {
                const isIndex = file === "index.md" ? true : false;
                const slug = file.replace(".md", "");
                const body = await processMarkdown(filePath);
                content.children.push(createFileNode(file, body, isIndex))
                
                
                
                const result = render(TEMPLATE_DIRECTORY + "/single.pug", {...SITE_CONFIG, post : body})
                const currentFolder = folder.replace(CONTENT_DIRECTORY, "")
                const outputFolder = OUTPUT_DIRECTORY + currentFolder + "/"; 
                await ensureDir(outputFolder)
                await writeFile(outputFolder + slug + ".html", result);
            } else {
                let newNode = createFolderNode(file)
                content.children.push(newNode)
                await buildTree(filePath, newNode)
            }
        }
        return content;
    } catch(err) {
        console.error(err);
    }
}

export async function buildIndex() {
    const tree = await buildTree(CONTENT_DIRECTORY);
    const list = tree.children.map((item) => ({link: item.path, title: getTitleFromChildren(item.children)}));
    const result = render(TEMPLATE_DIRECTORY + "/list.pug", {...SITE_CONFIG, posts: list})
    await writeFile(OUTPUT_DIRECTORY + "/index.html", result)
}

buildIndex()
