const price=100;
const paid=80;

// if(paid<price){
//     throw new Error('Pembayaran Kurang');
// }

//try-Catch Error
try {
  console.log('Memulai program');
  throw new Error('Error: Program berhenti');
  console.log('Mengakhiri program');
} catch (err) {
  console.log('Karena ada error, blok ini akan dieksekusi');
}

//Finally
try {
  console.log('Ini try block');
  throw new Error('Error: Sakit');
} catch (err) {
  console.log('Ini catch block');//kalau mau keluar harus di buat error di bagian try
} finally {
  console.log('Ini finally block');
}