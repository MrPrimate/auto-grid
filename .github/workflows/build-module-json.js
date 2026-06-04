import { readFileSync } from "fs";

const version = JSON.parse(readFileSync("package.json", "utf8")).version;
const mod = JSON.parse(readFileSync("module-template.json", "utf8"));
mod.version = version;
mod.download = `https://github.com/MrPrimate/auto-grid/releases/download/${version}/auto-grid.zip`;
console.log(JSON.stringify(mod));
