import fs from 'fs';
import path from 'path';

const fileLocation=path.resolve(import.meta.dirname,'./input.txt');
const fileLocation1=path.resolve(import.meta.dirname,'./output.txt');

const myReadableStream=fs.createReadStream(fileLocation,{
    highWaterMark:15
});

const myWriteableStream=fs.createWriteStream(fileLocation1);

myReadableStream.on('readable',()=>{
    try{
        
        const chunk = myReadableStream.read(); // Ambil sekali saja dari stream
      //  if(chunk != null){
            // Tulis isi datanya ke berkas (dan console bila perlu)
            myWriteableStream.write(chunk + '\n');
      //  }
    }catch(error){

    }
});

myReadableStream.on('end',()=>{
    myWriteableStream.end(); // Jangan lupa ditutup (end) stream yang ditulis
    console.log('End');
});

