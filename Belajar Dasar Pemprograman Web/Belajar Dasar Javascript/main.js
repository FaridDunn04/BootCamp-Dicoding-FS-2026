const age=10+9;
const name='Dicoding';
const PI=3.14;
console.log(`Aku ${name}, umurku ${age} tahun.`);
/*console.log('Nama ku Alex');*/
console.log(PI);

let    username='Alex Rins';
console.log(`Nama ku ${username}`);

username='Supri Marquest';

console.log(`Nama ku yang baru ${username}`);

const number=123;
const boolean=true;

const strnumber=String(number);
const strboolean=boolean.toString();

console.log(strnumber);
console.log(strboolean);

const strNomer='123';
const strFloat='3.14';
const booolean=true;

const numfromtring=Number(strNomer);
const numfromfloat=Number(strFloat);
const numfromboolean=Number(booolean);

console.log(numfromtring);
console.log(numfromfloat);
console.log(numfromboolean);

const cm='40cm';
const px='25.5px';

const intfromcm=parseInt(cm);
const floatfrompx=parseFloat(px);

console.log(intfromcm);
console.log(floatfrompx);


function KonversiCelsiuskeFahreinheit(temperatur){
    const hasil=(9/5)* temperatur+32;
    return hasil;
}

const temperaturfahreinheit=KonversiCelsiuskeFahreinheit(90);
console.log('Hasil Konversi :',temperaturfahreinheit);

function percobaanReturn(){
    //return 'Aku yang menang';
    console.log("Aku adalah Admin Slot");
}

const pesan=percobaanReturn();
console.log(pesan);

//FUNCTION EXPRESSION

const convertCelciusTorahreinheit=function(temper){
    const result=(9/5)* temper+32;
    return result;
}

const temperinfahreinheit=convertCelciusTorahreinheit(70);
console.log('Hasil Konversi :',temperaturfahreinheit);

//FIRST CLASS CITIZEN

function multiply(a,b){
    return a*b;
}

function calculate(operation,numA,numB){
    return operation(numA,numB);
}

const result=calculate(multiply,2,4);

console.log(result);


function multiplier(x){
    return function(num){
        return x*num;
    }
}

const double=multiplier(2);
const triple=multiplier(3);

console.log(double(10));
console.log(triple(12));


function alexx(c,d){
    return c/d;
}

function farid(operatioon,f,g){
    return operatioon(f,g);
}

const pertama=farid(alexx,10,2);

console.log(pertama);


function kedua(v){
    return function(j){
        return v*j/2;
    }
}

const satu=kedua(4);
const dua=kedua(5);

console.log(satu(7));
console.log(dua(8));

//Arrow Function
let tumper=null;
const convertcelciusdtofaharrow=(temperattur) =>{
    const resullt=(9/5)* temperattur+32;
    return resullt;
}

tumper=convertcelciusdtofaharrow(90);
console.log('Hasil Konversi',tumper);

const converarrowringkas=(temperattur) =>(9/5) *temperattur +32;

tumper= converarrowringkas(90);
console.log('Hasil Konversi :',tumper)