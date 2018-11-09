const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'uji@ventures-africa.com',
        pass: 'Bamidele@004!!'
    }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'to@email.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

module.exports = {
	
	};