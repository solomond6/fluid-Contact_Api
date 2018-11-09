const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let secretkey = "supersecret";

//declaring the mail transport class
let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'uji@ventures-africa.com',
        pass: 'Bamidele@004!!'
    }
});


//sending the mail to users 
const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'temisolo17@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

module.exports = {

    //method to create/signup users
    signup(req, res) {
        return Users
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
            })
            .then(users => res.status(201).send(users))
            .catch(error => res.status(400).send(error));
    },

    //method for users to signin
    signin(req, res) {
        return Users
            .findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(users => {

                //comparing the provided password with the encrypted password
                if (bcrypt.compareSync(req.body.password, users.password)) {
                    
                    //calling jwt to return the login token
                    let token = jwt.sign({ id: users.id, email: users.email }, secretkey, { expiresIn: 86400 });
                    
                    return res.status(200).send({ status: "ok", id: users.id, email: users.email, token: token });
                } else {
                    return res.status(400).send("Invalid Password");
                }
            })
            .catch(error => res.status(400).send(error));
    },

    forgotpassword(req, res) {
        //search for the user email address
        return Users
            .findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(users => {

                //calling the mail class
                transporter.sendMail(mailOptions, function (err, info) {
                    if(info){
                        console.log(info);
                        return res.status(200).send({ status: "ok", message: info });
                    }
                    else{
                        console.log(err);
                        return res.status(400).send(err);
                    }
                        
                });
            })
            .catch(error => res.status(400).send(error));
    },

};