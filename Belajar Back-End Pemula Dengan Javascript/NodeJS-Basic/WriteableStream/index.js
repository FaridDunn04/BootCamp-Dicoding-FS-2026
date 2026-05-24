import fs from 'fs';
import path from 'path';

const fileLocation=path.resolve(import.meta.dirname,'./output.txt');

const writeableStream=fs.createWriteStream(fileLocation);

writeableStream.write('Ini Merupakan teks baris pertama');
writeableStream.write('Ini merupakan teks baris kedua!\n');
writeableStream.end('Akhir dari writable stream!');