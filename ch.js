const { json } = require('body-parser');
var nodemailer = require('nodemailer');
let date = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
console.log('da',date.split(',')[1][1])


let checkdate= date.split(',')[1].replaceAll(' ','')[1] == ':'?date.split(',')[1].replaceAll(' ','')[0]:date.split(',')[1].replaceAll(' ','')[0]+date.split(',')[1].replaceAll(' ','')[1];
let ampm=date.split(',')[1].replaceAll(' ','').slice(-2);
console.log('da',checkdate,ampm)

let obj={car:'hii'}
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'flow669900@gmail.com',
      pass: 'zlgsquqhhizxyngy'
    }
  });
  
  var mailOptions = {
    from: 'flow669900@gmail.com',
    to: 'flow669900@gmail.com',
    subject: 'pivot point alert',
    html: `${JSON.stringify(obj)}`
  };
  

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});