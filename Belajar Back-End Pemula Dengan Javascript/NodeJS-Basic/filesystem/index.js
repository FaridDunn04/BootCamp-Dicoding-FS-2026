import fs from 'fs';
import path from 'path';

const fileLocation = path.resolve(import.meta.dirname, 'notes.txt');
const data=fs.readFileSync(fileLocation,'UTF-8');
console.log(data);