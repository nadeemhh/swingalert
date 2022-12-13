
console.log('hii')
// up 9 down 4.5

let array_of_dates=`9:04:55 AM
, 9:09:55 AM
, 9:14:55 AM
, 9:19:55 AM
, 9:24:55 AM
, 9:29:55 AM
, 9:34:56 AM
, 9:39:55 AM
, 9:44:54 AM
, 9:49:55 AM
, 9:54:55 AM
, 9:59:55 AM
, 10:04:55 AM
, 10:09:55 AM
, 10:14:55 AM
, 10:19:56 AM
, 10:24:56 AM
, 10:29:56 AM
, 10:34:55 AM
, 10:39:56 AM
, 10:44:56 AM
, 10:49:55 AM
, 10:54:56 AM
, 10:59:56 AM
, 11:04:55 AM
, 11:09:55 AM
, 11:14:55 AM
, 11:19:55 AM
, 11:24:56 AM
, 11:29:56 AM
, 11:34:56 AM
, 11:39:56 AM
, 11:44:56 AM
, 11:49:57 AM
, 11:54:57 AM
, 11:59:55 AM
, 12:04:56 PM
, 12:09:56 PM
, 12:14:55 PM
, 12:19:56 PM
, 12:24:56 PM
, 12:29:56 PM
, 12:34:56 PM
, 12:39:56 PM
, 12:44:56 PM
, 12:49:57 PM
, 12:54:57 PM
, 12:59:56 PM
, 1:04:56 PM
, 1:09:56 PM
, 1:14:57 PM
, 1:19:55 PM
, 1:24:56 PM
, 1:29:55 PM
, 1:34:56 PM
, 1:39:57 PM
, 1:44:56 PM
, 1:49:56 PM
, 1:54:56 PM
, 1:59:57 PM
, 2:04:56 PM
, 2:09:56 PM
, 2:14:56 PM
, 2:19:57 PM
, 2:24:56 PM
, 2:29:56 PM
, 2:34:56 PM
, 2:39:56 PM
, 2:44:57 PM
, 2:49:57 PM
, 2:54:57 PM
, 2:59:56 PM
, 3:04:56 PM
, 3:09:56 PM
, 3:14:56 PM
, 3:19:56 PM
, 3:24:57 PM
, 3:29:56 PM
, 3:34:57 PM`.split(',');


 let array_of_price=`608.55
 ,608.55
 ,608.55
 ,609.85
 ,610.5
 ,609.6
 ,609.2
 ,608.65
 ,609.3
 ,608.55
 ,607.85
 ,608.1
 ,608.6
 ,608.35
 ,608.05
 ,608.05
 ,607.4
 ,607.15
 ,606.95
 ,605.75
 ,604.9
 ,604.5
 ,604.35
 ,603.9
 ,603.15
 ,603
 ,603.2
 ,603
 ,603.45
 ,602.65
 ,602.1
 ,602.7
 ,603.15
 ,603.1
 ,602.9
 ,602.95
 ,602.75
 ,602.8
 ,603.05
 ,602.7
 ,602.8
 ,602.8
 ,602.85
 ,602.8
 ,602.1
 ,600.75
 ,600.1
 ,600.2
 ,599.9
 ,600.1
 ,600.3
 ,600
 ,599.6
 ,600.45
 ,600.15
 ,599.25
 ,598.9
 ,600
 ,600.1
 ,600.6
 ,601
 ,601.1
 ,601.45
 ,601.9
 ,602.15
 ,602.05
 ,602.65
 ,602.9
 ,602.85
 ,601.8
 ,601.85
 ,600.15
 ,601.25
 ,602.8
 ,603.15
 ,603.45
 ,602.8
 ,603
 ,602.45,
`.split(',').map(function(str) {
         // using map() to convert array of strings to numbers

         return parseFloat(str); });

//let array_of_price=[28,27,28,27,26,25,26,27,28,29,30,29,28,27,28,29,30,29,28,30,31,32,31,32,33,34,35,34,33,32,31];

let swing_start;
let swing_end;
let getout=0;
let getout2=0;
let checksametypeofhighswing=[];
console.log(array_of_price[53],array_of_dates[53])
for(let i=0; i<array_of_price.length; i++){
  let persentage=0;
  let persentagecon=0;
  let margin={margin:0};
let lowmargin={lowmargin:0};
  getout=0;
  getout2=0;
  swing_start=array_of_price[i];

  if(i!=array_of_price.length-1){


   // swing up check
  // check  if swing_start is less than coming price
  if(swing_start <= array_of_price[i+1] && swing_start < array_of_price[i-1] && swing_start < array_of_price[i-2]){
    //console.log('ss',swing_start,array_of_dates[array_of_price.indexOf(swing_start)])
    let inc = i+1;
for(let ii=inc; ii<array_of_price.length; ii++){

  // check  if swing_start is less than coming price
if(swing_start <= array_of_price[ii]){
  
  margin.margin=array_of_price[ii]-swing_start;

  persentagecon=margin.margin/swing_start*100;
persentage=parseFloat(persentagecon.toFixed(2));

  swing_end=array_of_price[ii];

if(persentage >= 10 && swing_end > array_of_price[ii+1]){
  
  
  if(getout == 0){
if(checksametypeofhighswing.includes(swing_end)  == false){

  //console.log('high',swing_start,swing_end,persentage)
  checksametypeofhighswing.push(swing_end)
  //console.log(persentage ,'>=', 9, '&&', swing_end, '>', array_of_price[ii+1])
  getout++;
  let inc2 = ii+1;
  /////// low check
  
  for(let iii=inc2; iii<array_of_price.length; iii++){
   
    if(swing_start < array_of_price[iii]){
      
if(swing_end >= array_of_price[iii]){
  lowmargin.lowmargin=swing_end-array_of_price[iii];
  //console.log(lowmargin.lowmargin ,'.>=.', (swing_end-swing_start)/10*5,swing_start,swing_end,array_of_price[iii])
  //console.log('swing_end',swing_end,array_of_dates[array_of_price.indexOf(swing_end)],lowmargin.lowmargin,(swing_end-swing_start)/10*5)
  //console.log(array_of_dates[array_of_price.indexOf(swing_start)],'swing_start',swing_start,'swing_end',swing_end,array_of_dates[array_of_price.indexOf(array_of_price[iii])],array_of_price[iii])
  if(lowmargin.lowmargin >= (swing_end-swing_start)/10*5){
   
    if(getout2 == 0){
    console.log('low',swing_start,swing_end,array_of_price[iii],margin.margin,lowmargin.lowmargin,array_of_dates[array_of_price.indexOf(swing_start)],array_of_dates[array_of_price.indexOf(swing_end)],array_of_dates[iii])
    //console.log('low',swing_start,swing_end,array_of_price[iii],margin.margin,lowmargin.lowmargin)
    getout2++;
    }
    
  }
}

else{
  margin.margin=array_of_price[iii]-swing_start;
  swing_end=array_of_price[iii];
}
    }

    else{break;}
  }
///////////////
  
}
else{break;}
  }

}

}
else{
//console.log('yehi',swing_start,swing_end,margin.margin)
console.log('at support')
break;}
}

  }

  }

}

