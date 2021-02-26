import {writeFile, mkdir, access, unlink, readdir} from "fs/promises"
import path from "path"
import faker from "faker"
import {buildIndex} from "./index.mjs"

const BENCHMARK_TEST_FOLDER = "./benchmark_test"
export async function generateTempFile(folder) {
    const filePath = path.join(folder, faker.name.firstName() + ".md");
    await writeFile(filePath, faker.lorem.paragraphs(), "utf-8");
}

export async function generateTempFiles() {
    try {
        await access(BENCHMARK_TEST_FOLDER);
    } catch(err) {
        await mkdir(BENCHMARK_TEST_FOLDER) 
    }
    let files = await readdir(BENCHMARK_TEST_FOLDER);
    for await(const file of files) {
        await unlink(path.join(BENCHMARK_TEST_FOLDER, file));
    }
    let numbers = new Array(1000);
    for await (const n of numbers) {
        await generateTempFile(BENCHMARK_TEST_FOLDER)
    }
    console.log("finish generating test file");  
}

export async function benchmark() {
    await generateTempFiles();
    const start = Date.now();
    console.log("start timer for benchmarking");
    await buildIndex();
    const elapsed = Date.now() - start;
    console.log("done");
    console.log("took", elapsed / 1000  + "seconds");
}

await benchmark();