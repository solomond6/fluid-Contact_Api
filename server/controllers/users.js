const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let secretkey = "supersecret";

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'uji@ventures-africa.com',
        pass: 'Bamidele@004!!'
    }
});

const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'temisolo17@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

module.exports = {

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

    signin(req, res) {
        return Users
            .findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(users => {
                if (bcrypt.compareSync(req.body.password, users.password)) {
                    let token = jwt.sign({ id: users.id, email: users.email }, secretkey, { expiresIn: 86400 });
                    return res.status(200).send({ status: "ok", id: users.id, email: users.email, token: token });
                } else {
                    return res.status(400).send("Invalid Password");
                }
            })
            //.then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

    forgotpassword(req, res) {
        return Users
            .findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then(users => {
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
            //.then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

};