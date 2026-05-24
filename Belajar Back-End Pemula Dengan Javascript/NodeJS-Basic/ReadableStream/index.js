import fs from 'fs';
import path from 'path';

const fileLocation=path.resolve(import.meta.dirname,'article.txt')
const readableStream=fs.createReadStream(fileLocation,{
    highWaterMark:10
});

readableStream.on('readable',()=>{
    try{
        process.stdout.write(`[${readableStream.read()}]`);
    }catch(error){

    }
});

readableStream.on('end',()=>{
    console.log('Done');
});