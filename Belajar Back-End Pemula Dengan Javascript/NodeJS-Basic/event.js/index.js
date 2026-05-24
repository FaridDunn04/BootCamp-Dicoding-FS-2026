import {EventEmitter} from 'events';

const myEventEmitter=new EventEmitter();

const makeCoffe=({name})=>{
    console.log(`Kopi ${name} telah di buat`);
};

const makeBill=({price})=>{
    console.log(`Bill sebesar ${price} telah di buat`);
};

const onCoffeeOrderedListener=({name,price})=>{
    makeCoffe({name});
    makeBill({price});
};

myEventEmitter.on('coffe-order',onCoffeeOrderedListener);

myEventEmitter.emit('coffe-order',{name:'tubruk',price: 150000});
