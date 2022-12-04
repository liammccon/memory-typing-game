import { readFileSync } from 'node:fs';

const path = './assets/common-words.txt'
const {readFileSync, promises: fsPromises} = require('fs');

class FileReader {
    static getWordsArray(){
        const contents = readFileSync(path, 'utf-8');

        const arr = contents.split(/\r?\n/);

        console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

        return arr;
    }
} 

export default FileReader;


