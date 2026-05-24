//STRUKTUR DENGAN OBJECT
const account={
    balance:1000,
    dept:10,
};

account.balance=4000;
console.log(account.balance);

delete account.dept;
console.log(account);

const user = {
  id: 24,
  email: 'aras@dicoding.com',
  name: 'Arsy',
  nickname: 'Aras',
  username: 'aras123',
  password: 'secret',
};

delete user['id'];//menghapus properti di dalam object

const {id,email,name,nickname}=user;
const un=user.username;
const pw=user.password;

console.log(id,email,name,nickname,un,pw);
console.log(user);
console.log(typeof user);

//STRUKTUR DENGAN ARRAY

let myarray=[1,2,3,4,5,6,4,9,12];
myarray[2]=200;
console.log(myarray); 

delete myarray[1];
console.log(myarray);

myarray.splice(1,2);
console.log(myarray);

myarray.shift();
console.log(myarray);

myarray.pop();
console.log(myarray);

const introduction=['Hello','Arsy'];
const [greeting,nama]=introduction;

console.log(nama);

//method array

myarray.reverse();
console.log(myarray);

myarray.sort();
console.log(myarray);

//STRUKTUR DENGAN MAP

const productMap=new Map([
    ['shoes', 500],
    ['cap', 350],
    ['jeans', 250]
]);

console.log(productMap);

const map=new Map();
map.set('name','aras');
map.set('Address','Lusan');
map.set('TTL','19-April-2006');
map.delete('TTL');

console.log(map.get('name'));
console.log(map);

//STRUKTUR DENGAN SET
const set= new Set();
set.add(1);
set.add('Aple');
set.add(2);
set.add('Mangga');

console.log(set);
for (const number of set) {
  console.log(number); // Output: 1, 2
}

set.forEach((value)=>console.log(value));

set.delete(1);
set.forEach((value)=>console.log(value));

//SPREAD OPERATOR
//object
const obj1 = { name: 'Dicoding' };
const obj2 = { lastName: 'Indonesia', address: 'Jl. Batik Kumeli No 50' };
const newObj = { ...obj1, ...obj2 };

console.log(newObj); 


//array
const array1 = ['Dicoding'];
const array2 = ['Indonesia', 'Jl. Batik Kumeli No 50'];
const newArray = [...array1, ...array2];

console.log(newArray); 

const employees = [
  {
    name: 'Fulan',
    email: 'fulan@dicoding.com',
    joinYear: 2020,
  },
];

function addEmployee(name, email, joinYear) {
  employees.push({
    name: name,
    email: email,
    joinYear: joinYear,
  });
}

addEmployee('Budi', 'budi@dicoding.com', 2023);
addEmployee('Faridh','cakfarid12@gmail.com','2006');

console.log(employees);