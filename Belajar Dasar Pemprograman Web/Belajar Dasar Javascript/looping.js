//FOR
for (let i = 0; i < 5; i++) {
  console.log(`Angka ke-${i} adalah ${i}`);
}

const person={name:'Fulan',origin:'Bandung', birtday:2024};

for(const property in person){
    console.log(`${property} bernilai ${person[property]}`);
}

const names=['Bebek','Ayam', 'Telor', 'Tempe'];

for(const oke of names){
    console.log(oke);
}

//while
let i = 0;

while (i < 5) {
  console.log(`Angka ke-${i} adalah ${i}.`);
  i++;
}

do {
  console.log(`Angka ke-${i} adalah ${i}.`);
  i++;
}while(i<10);

//Break dan Continue Statmen

for(let i=0;i<10;i++){
    if(i===8){
        break;
    }
    console.log(i);
}

for(let i=0;i<10;i++){
    if(i===8){
        continue;
        console.log("aku");
    }
    console.log(i);
}