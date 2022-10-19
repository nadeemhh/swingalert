
let date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
console.log('da',date.split(',')[1])
console.log('da',date.split(',')[1].replaceAll(' ','').slice(3,5))
console.log('sec',date.split(',')[1].replaceAll(' ','').slice(6,8))
let minutes=date.split(',')[1].replaceAll(' ','')[0] <10 ?date.split(',')[1].replaceAll(' ','').slice(2,4):date.split(',')[1].replaceAll(' ','').slice(3,5);
let seconds=date.split(',')[1].replaceAll(' ','')[0] <10 ? date.split(',')[1].replaceAll(' ','').slice(5,7):date.split(',')[1].replaceAll(' ','').slice(6,8);
console.log('yes',date.split(',')[1].replaceAll(' ',''),minutes,seconds)
// setInterval(() => {


//   let date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
// console.log('ch',date.split(',')[1])

// let minutes=date.split(',')[1].replaceAll(' ','').slice(3,5);
// let seconds=date.split(',')[1].replaceAll(' ','').slice(6,8);
//   if(parseFloat(minutes)==04 && parseFloat(seconds)==00 || parseFloat(minutes)==57 && parseFloat(seconds)==00 ||parseFloat(minutes)==58 && parseFloat(seconds)==00){
//     console.log('yes',minutes,seconds)
//   }
// }, 1000);

let checkdate= date.split(',')[1].replaceAll(' ','')[1] == ':'?date.split(',')[1].replaceAll(' ','')[0]:date.split(',')[1].replaceAll(' ','')[0]+date.split(',')[1].replaceAll(' ','')[1];

let ampm=date.split(',')[1].replaceAll(' ','').slice(-2);

console.log('da2',checkdate,ampm)

