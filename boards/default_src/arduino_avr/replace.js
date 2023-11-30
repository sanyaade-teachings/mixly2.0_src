const fs = require('fs');
const path = require('path');

const BLOCKS_PATH = path.resolve(__dirname, '../python_skulpt_mixtoy/blocks');
const GENERATORS_PATH = path.resolve(__dirname, '../python_skulpt_mixtoy/generators');

const blocksDir = fs.readdirSync(BLOCKS_PATH);
const generatorDir = fs.readdirSync(GENERATORS_PATH);

for (let i of blocksDir) {
    let nowFilePath = path.resolve(BLOCKS_PATH, i);
    let origin = fs.readFileSync(nowFilePath, { encoding: 'utf-8' });
    origin = origin.replace(/Blockly\.Blocks\[['"]([\u4E00-\u9FA5A-Za-z0-9_]+)['"]\][\s]*=[\s]*/g, "export const $1 = ");
    origin = origin.replace(/Blockly\.Blocks\.([\u4E00-\u9FA5A-Za-z0-9_]+)[\s]*=[\s]*/g, "export const $1 = ");
    origin = origin.replace(/Blockly\.Blocks\./g, "");
    origin = origin.replace(/Blockly\.Blocks\[['"]([\u4E00-\u9FA5A-Za-z0-9_]+)['"]\]/g, "$1");
    fs.writeFileSync(nowFilePath, origin);
}

for (let i of generatorDir) {
    let nowFilePath = path.resolve(GENERATORS_PATH, i);
    let origin = fs.readFileSync(nowFilePath, { encoding: 'utf-8' });
    origin = origin.replace(/Blockly\.Python\.forBlock\[['"]([\u4E00-\u9FA5A-Za-z0-9_]+)['"]\][\s]*=[\s]*/g, "export const $1 = ");
    origin = origin.replace(/Blockly\.Python\.forBlock\.([\u4E00-\u9FA5A-Za-z0-9_]+)[\s]*=[\s]*/g, "export const $1 = ");
    origin = origin.replace(/Blockly\.Python\.forBlock\./g, "");
    origin = origin.replace(/Blockly\.Python\.forBlock\[['"]([\u4E00-\u9FA5A-Za-z0-9_]+)['"]\]*/g, "$1");
    fs.writeFileSync(nowFilePath, origin);
}
