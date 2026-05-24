//If and Else

const score=88;

if(score>90){
    console.log('Selamat ,Anda mendapatkan nilai A');
}else if(score >80){
    console.log('Selamat anda lulus ujian');
}else{
    console.log('Tidak lulus ujian');
}

const nilai=score>=90 ? "Nilai Tinggi":"Nilai rendah";
console.log(nilai);

//SWITCH CASE

const fruit='apple';

switch(fruit){
    case 'banana':
        console.log('Aku banana');
        break;
    case 'apple':
        console.log('Aku aplle');
        break;
    default:
        console.log('Aku bukan buah');
        break;
}


const day=new Date().getDay();

if(day===0){
    console.log('Minggu');
}else if(day===1){
    console.log('Senin');
}else if(day===2){
    console.log('Selasa');
}else if(day===3){
    console.log('Rabu');
}else if(day===4){
    console.log('Kamis');
}else if(day===5){
    console.log('Jumat');
}else if(day===6){
    console.log('Sabtu');
}else{
    console.log('Hari tidak valid');
}

switch(day){
    case 0:
        console.log('Minggu');
        break;
    case 1:
        console.log('Senin');
        break;
    case 2:
        console.log('Selasa');
        break;
    case 3:
        console.log('Rabu');
        break;
    case 4:
        console.log('Kamis');
        break;
    case 5:
        console.log('Jumat');
        break;
    case 6:
        console.log('Sabtu');
        break;
    default:
        console.log('Tidak ada hari');
        break;
}