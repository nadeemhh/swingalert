let arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let swing_start =6;
let swing_end =12;
function lengthBetween(swing_start,swing_end) {
  let lengthbetween = arr.indexOf(swing_start)-arr.indexOf(swing_end)
return Math.abs(lengthbetween);
}
let length_Between= lengthBetween(12,14);
console.log(length_Between)



