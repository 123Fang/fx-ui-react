import path from "path";
import glob from "fast-glob";
import { fileURLToPath } from "node:url";
import fs from "fs";
// import fileSave from "file-save";
import render from "json-templater/string.js";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entryFilePath = path.join(__dirname, '../packages/index.ts')

const IMPORT_TEMPLATE = "export { default as {{name}} } from './{{name}}';";
const ENTRY_TEMPLATE = "{{import}}"

let importList = []
let entryTemplate = ''

async function main() {
  let components = await glob(["packages/**"], {onlyDirectories: true});
  components = components.map((pathString) => {
    return pathString.split('/')[1]
  })

  components.forEach((componentName) => {
    importList.push(render(IMPORT_TEMPLATE, {
      name: componentName,
    }))
  })

  let endOfLine = os.EOL;
  entryTemplate = render(ENTRY_TEMPLATE, {
    import: importList.join(endOfLine),
  })

  fs.writeFileSync(entryFilePath, entryTemplate);
  console.log("组件entry入口文件自动引入成功 :", entryFilePath);
}
main()
