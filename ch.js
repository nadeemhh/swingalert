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
      user: 'foranyuse2221@gmail.com',
      pass: 'lphzxvhzkhnolfsg'
    }
  });
  
  var mailOptions = {
    from: 'foranyuse2221@gmail.com',
    to: 'foranyuse2221@gmail.com',
    subject: 'pivot point alert',
    html: `new rgmail`
  };
  

transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});