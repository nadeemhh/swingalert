const express = require('express')
const path = require('path')
const webpush = require("web-push");
const bodyParser = require("body-parser");
const app = express()
app.use(express.json())
app.use(bodyParser.json());
let cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const validator = require('validator')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');
const { json } = require('express/lib/response');
var nodemailer = require('nodemailer');
const { Console } = require('console')
const publicDirectoryPath = path.join(__dirname, './client')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3600

mongoose.connect('mongodb+srv://virtual-trading:hkiyygh68tfgcfhs586@cluster0.ohx5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//mongoose.connect('mongodb+srv://pivotpoint:767967574@cluster0.fw3uvzc.mongodb.net/?retryWrites=true&w=majority')

const Pricesforstock = mongoose.model('Pricesforstock', {
  scriptName : {
    type: String
       
    },
    scriptprice : [
      {
        price:{
          type: String
             
          },
        onetodelete : {
            type: String
               
            },
            date : {
              type: String
                 
              }

      }]
     
  })


  const Dublicateswing = mongoose.model('Dublicateswing', {
    swings : {
      type: Number
         
      },
     
       
    })
   

/////////////////////////////////////////////////
let deletalert={count:0}
let objectomail={};

async function getRequest() {
  try {
   //////////////try start//////////////
 
   console.log('###checking started###')
   let date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
   console.log('cldate',date)
   let checkdate= date.split(',')[1].replaceAll(' ','')[1] == ':'?date.split(',')[1].replaceAll(' ','')[0]:date.split(',')[1].replaceAll(' ','')[0]+date.split(',')[1].replaceAll(' ','')[1];
 
   let ampm=date.split(',')[1].replaceAll(' ','').slice(-2);
 
   if(parseFloat(checkdate) == 12 && ampm == 'AM'?false:parseFloat(checkdate) >= 9 && ampm == 'AM' || parseFloat(checkdate) <= 4 && ampm == 'PM' || parseFloat(checkdate) == 12 && ampm == 'PM'){
     console.log('opdate',date)
   let all_script = await Pricesforstock.find({}).exec();
   deletalert.count=0;
  
 //////////////getting price of stock//////////////
 
   for(let i=0; i<all_script.length; i++){
    
     console.log('da',date)
   const response = await axios.get(`https://in.investing.com/equities/${all_script[i].scriptName}`);
   
 let nameofscript=all_script[i].scriptName;
   const dom = new JSDOM(response.data)
   console.log(dom.window.document.querySelectorAll('.js-streamable-element')[0].textContent.replace(',',''))
   let priceofstock=dom.window.document.querySelectorAll('.js-streamable-element')[0].textContent.replace(',','');
   date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
   //////////////saving price of stock //////////////
 
  Pricesforstock.findOneAndUpdate({scriptName:all_script[i].scriptName}, {$push: {scriptprice: {price:priceofstock,	
   onetodelete:'1',date:date}}},
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log('pushed in scriptprice');
            
           }
       });
 
 
       let price = await Pricesforstock.find({scriptName:all_script[i].scriptName}).exec();
       let array_of_price=[];
       let array_of_dates=[];
       for(let f = 0; f < price[0].scriptprice.length; f++){
         array_of_price.push(parseFloat(price[0].scriptprice[f].price))
         array_of_dates.push(price[0].scriptprice[f].date)
       }
       console.log(array_of_price,array_of_dates)
 
       
 let swing_start;
 let swing_end;
 let getout=0;
 let getout2=0;
 let checksametypeofhighswing=[];
 
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
 
     let inc = i+1;
 for(let ii=inc; ii<array_of_price.length; ii++){
 
   // check  if swing_start is less than coming price
 if(swing_start <= array_of_price[ii]){
   
   margin.margin=array_of_price[ii]-swing_start;
 
   persentagecon=margin.margin/swing_start*100;
 persentage=parseFloat(persentagecon.toFixed(2));
 
   swing_end=array_of_price[ii];
 
 if(persentage >= 0.4 && swing_end > array_of_price[ii+1]){
   
   
   if(getout == 0){
 
     let checkalerts = await Dublicateswing.find({}).exec();
     for(let j =0; j<checkalerts.length; j++){
       checksametypeofhighswing.push(checkalerts[j].swings)
    }
 
 if(checksametypeofhighswing.includes(swing_end)  == false){
 
   getout++;
   let inc2 = ii+1;
   /////// low check
   
   for(let iii=inc2; iii<array_of_price.length; iii++){
    
     if(swing_start < array_of_price[iii]){
       
 if(swing_end >= array_of_price[iii]){
   lowmargin.lowmargin=swing_end-array_of_price[iii];
 
   if(lowmargin.lowmargin >= (swing_end-swing_start)/10*5){
    
     if(getout2 == 0){
     console.log('low',swing_start,swing_end,array_of_price[iii])
     getout2++;
     ////maling///
      objectomail={scriptname:nameofscript,swing_start:swing_start,swing_end:swing_end,retracement:array_of_price[iii],ssrtd:array_of_dates[array_of_price.indexOf(swing_start)].split(',')[1],sendd:array_of_dates[array_of_price.indexOf(swing_end)].split(',')[1],retraced:array_of_dates[iii].split(',')[1]}
 
      const Dublicateswings = new Dublicateswing({
       swings:swing_end,
    
    })
    Dublicateswings.save() 
 
      mailfunction()
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
 break;
 }
 }
 
   }
 
   }
 
 }
 
 //////////////saving price of stock end//////////////
 
  }
 
 //////////////getting price of stock end//////////////
  }
  else{
   console.log('market is close')
   if(deletalert.count == 0){
   await Dublicateswing.deleteMany({})
   deletalert.count++;
 }
 }
 //////////////try end//////////////
  } catch (err) {
      console.log(err)
  }
 }

setInterval(function () {
  console.log('#new app#')
 let date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
console.log('ch',date.split(',')[1])

let minutes=date.split(',')[1].replaceAll(' ','')[0] <10 ?date.split(',')[1].replaceAll(' ','').slice(2,4):date.split(',')[1].replaceAll(' ','').slice(3,5);

let seconds=date.split(',')[1].replaceAll(' ','')[0] <10 ? date.split(',')[1].replaceAll(' ','').slice(5,7):date.split(',')[1].replaceAll(' ','').slice(6,8);

  if(parseFloat(minutes)==05 && parseFloat(seconds)==00 || parseFloat(minutes)==10 && parseFloat(seconds)==00 ||parseFloat(minutes)==15 && parseFloat(seconds)==00 || parseFloat(minutes)==20 && parseFloat(seconds)==00 || parseFloat(minutes)==25 && parseFloat(seconds)==00 ||parseFloat(minutes)==30 && parseFloat(seconds)==00 || parseFloat(minutes)==35 && parseFloat(seconds)==00 ||parseFloat(minutes)==40 && parseFloat(seconds)==00 || parseFloat(minutes)==45 && parseFloat(seconds)==00 ||parseFloat(minutes)==50 && parseFloat(seconds)==00 || parseFloat(minutes)==55 && parseFloat(seconds)==00 ||parseFloat(minutes)==60 && parseFloat(seconds)==00){

    console.log('yes',minutes,seconds)
    getRequest()

  }

  else{console.log('waiting for 5 min')}



}, 1000);


////////////////////mail function/////////////
function mailfunction() {
        
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'foranyuse2221@gmail.com',
              pass: 'lphzxvhzkhnolfsg'
            }
          });
          
          var mailOptions = {
            from: 'foranyuse2221@gmail.com',
            to: 'foranyuse2221@gmail.com',
            subject: 'swing alert for stock',
            html: `<p>scriptname = ${objectomail.scriptname}</p><p>swing_start = ${objectomail.swing_start} - ${objectomail.ssrtd}</p><p>swing_end = ${objectomail.swing_end} - ${objectomail.sendd}</p><p>retracement = ${objectomail.retracement} - ${objectomail.retraced}</p>`
          };
          
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
    
}
    
                   

 app.get('/clearprice', async (req, res) => {
  checksametypeofhighswing=[]
   let all_script = await Pricesforstock.find({}).exec();

   for(let i=0; i<all_script.length; i++){

    Pricesforstock.findOneAndUpdate({scriptName:all_script[i].scriptName}, {$pull: {scriptprice: {onetodelete:'1'}}},
    function (error, success) {
          if (error) {
              console.log(error);
          } else {
              console.log('cleared price');
           
          }
      });
     if(i==all_script.length-1){
      res.send('cleared')
     }
   }

 })

app.listen(port)

