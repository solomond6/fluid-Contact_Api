const usersController = require('../controllers').users;
const contactsController = require('../controllers').contacts;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Fluid Contact API!',
    }));

    app.post('/api/user/signup', usersController.signup);
    app.post('/api/user/signin', usersController.signin);
    app.post('/api/user/forgotpassword', usersController.forgotpassword);

    app.post('/api/contact', contactsController.create);
    app.get('/api/contact', contactsController.list);
    app.get('/api/contact/:contactId', contactsController.retrieve);
    app.patch('/api/contact/:contactId', contactsController.update);
    app.delete('/api/contact/:contactId', contactsController.destroy);
    app.patch('/api/contact/:contactId/star', contactsController.updatestar);
};