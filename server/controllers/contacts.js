const Contacts = require('../models').Contacts;
const jwt = require("jsonwebtoken");
let secretkey = "supersecret";

module.exports = {

    //method to create contacts
    create(req, res) {

        //getting the token form the request header or request body
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, secretkey, function(err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    req.userId = decoded.id;

                    return Contacts
                        .create({
                            title: req.body.title,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            phone_number: req.body.phone_number,
                            address: req.body.address
                        })
                        .then(contacts => res.status(201).send(contacts))
                        .catch(error => res.status(400).send(error));
                }
            });
        }
    },

    //listing all contacts
    list(req, res, next) {

        //getting the token form the request header or request body
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, secretkey, function(err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    req.userId = decoded.id;
                    return Contacts
                        .findAll()
                        .then(contacts => res.status(200).send(contacts))
                        .catch(error => res.status(400).send(error));
                }
            });
        }
    },

    //retrieving a contact by id
    retrieve(req, res) {

        //getting the token form the request header or request body
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, secretkey, function(err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    req.userId = decoded.id;
                    return Contacts
                        .findById(req.params.contactId)
                        .then(contact => {
                            if (!contact) {
                                return res.status(404).send({
                                    message: 'Contact Not Found',
                                });
                            }
                            return res.status(200).send(contact);
                        })
                        .catch(error => res.status(400).send(error));
                }
            });
        }
    },


    //updating a contact by id
    update(req, res) {
        //getting the token form the request header or request body
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, secretkey, function(err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    return Contacts
                        .findById(req.params.contactId)
                        .then(contact => {
                            if (!contact) {
                                return res.status(404).send({
                                    message: 'Contact Not Found',
                                });
                            }
                            return contact
                                .update({
                                    title: req.body.title || contact.title,
                                    firstname: req.body.firstname || contact.firstname,
                                    lastname: req.body.lastname || contact.lastname,
                                    email: req.body.email || contact.email,
                                    phone_number: req.body.phone_number || contact.phone_number,
                                    address: req.body.address || contact.address
                                })
                                .then(() => res.status(200).send(contact)) // Send back the updated todo.
                                .catch((error) => res.status(400).send(error));
                        })
                        .catch((error) => res.status(400).send(error));
                }
            });
        }
    },

    //deleting a contact by id
    destroy(req, res) {
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(token, secretkey, function(err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    req.userId = decoded.id;
                    return Contacts
                        .findById(req.params.contactId)
                        .then(contact => {
                            if (!contact) {
                                return res.status(400).send({
                                    message: 'Todo Not Found',
                                });
                            }
                            return contact
                                .destroy()
                                .then(() => res.status(200).send({ message: 'Contact deleted successfully.' }))
                                .catch(error => res.status(400).send(error));
                        })
                        .catch(error => res.status(400).send(error));
                }
            });
        }
    },
};