const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
let secretkey = "supersecret";

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

};