let date = new Date().toLocaleString('en-IN');
console.log('da',date.split(',')[1].replaceAll(' ',''))


let checkdate= date.split(',')[1].replaceAll(' ','')[1] == ':'?date.split(',')[1].replaceAll(' ','')[0]:date.split(',')[1].replaceAll(' ','')[0]+date.split(',')[1].replaceAll(' ','')[1];
let ampm=date.split(',')[1].replaceAll(' ','').slice(-2);
console.log('da',checkdate,ampm)