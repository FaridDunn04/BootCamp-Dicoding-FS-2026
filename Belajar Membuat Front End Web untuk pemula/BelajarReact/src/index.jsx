// import React from 'react';
// import {createRoot} from 'react-dom/client';
// import DicodingLogo from './assets/dicoding-logo.png';
// import Halaman from './index1';

// // const heading=React.createElement('h1',null,'Biodata Perusahaan');
// // const listitem1=React.createElement('li',null,'Nama : Dicoding Indonesia');
// // const listitem2=React.createElement('li',null,'Bidang : Education');
// // const listitem3=React.createElement('li',null,'Tagline : Decode Ideas, Discover Potential');

// // const unserlist=React.createElement('ul',null,[listitem1,listitem2,listitem3]);

// // const container=React.createElement('div',null,[heading,unserlist]);


// function InstagramProfile(props){
//     const name=props.name;
//     const username=props.username;
//     const bio=props.bio;
//     const isVerified=props.isVerified;

//     return (
//         <div>
//             <dl>
//                 <dt>Name : {name}</dt>
//                 <dt>Username : {username} </dt>
//                 <dt>Bio : {bio}</dt>
//                 <dt>Verified : {isVerified ? 'yes' :'no'}</dt>
//             </dl>
//         </div>
//     )
// }

// function SearchBar(){
//     return (
//         <div className='search_bar_container'>
//             <input type='text' placeholder='Search...'/>
//             <div  className='search-bar_instok_checkbox'>
//                 <input type='checkbox'/>
//                 <label>Only Show Products in stick</label>
//             </div>
//         </div>
//     );
// }

// function ProduckKategoryRow({name}){
//     return( 
//         <tr>
//             <td colSpan="2">
//                 <strong>{name}</strong>
//             </td>
//         </tr>
//     );
// }

// function ProdukRow({name,price}){
//     return(
     
//         <tr>
//             <td>{name}</td>
//             <td>{price}</td>
//         </tr>
     
//     )
// }

// function ProdukTable(){
//     return (
//         <div className='product-table_container'>
//             <table>
//                 <tbody>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                     </tr>
//                     <ProduckKategoryRow name='Sporting Goods'/>
//                     <ProdukRow name='Football' price='$49.00'/>
//                     <ProdukRow name='Baseball' price='$9.99'/>
//                     <ProdukRow name='Basketball' price='$49.99'/>
//                     <ProduckKategoryRow name='Electronics'/>
//                     <ProdukRow name='Ipod Touch' price='$99.99'/>
//                     <ProdukRow name='Iphone 5' price='$399.99'/>
//                     <ProdukRow name='Nexus 7' price='$199.99'/>
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// function FilterableProductTable(){
//     return (
//         <div className='container'>
//             <SearchBar />
//             <ProdukTable />
//         </div>
//     );
// }

// function App(){
//     return (
//         <div>
//             <h1> Biodata Perusahaan</h1>
//             <InstagramProfile name='Dicoding Indonesia' username='@Dicoding_Indonesia' bio='The Greate Ideas' isVerified/>
//             <img src={DicodingLogo} alt='Dicoding Logo'/>
//             <FilterableProductTable />
//         </div>
//     );
// }
// const root=createRoot(document.getElementById('root'));

// root.render(<App />);