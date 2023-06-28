const { Client, ClientLogin } = require('../../models/clientRegister')
const { CartTable } = require('../../models/cartOfClient')
// IMport sendMailForClientRegister file for models folder to send mail
const sendRegistrationEmail = require('../../models/sendMailForClientRegister')
// get client registration file
exports.clientRegister = (req, res, next) => {
    const { firstName, lastName } = req.body;
    res.render('client/client-register', {
        path: `/client-register`,
        pageTitle: 'Register',
        clientName: `${firstName} ${lastName}`
    })
}
// Register a new client
exports.clientPostRegister = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        // generate a unique table name
        const tableName = firstName + "_" + lastName + "_" + "CART"
        // find client if it exists or not
        Client.findOrCreate({
            where: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }
        }).then(([user, created]) => {
            // if client is not exist in client table then create new one
            if (created) {
                // after create new client send email notification
                sendRegistrationEmail(email)
                // after create new client and send email notification create new Table for new client and save it in variable
                const tableOfCart = CartTable(tableName)
                // sync variable to create new tablet
                tableOfCart.sync();
                // after do all movements render client to login page
                res.redirect('client-login')
            }
            // if client already exists tray register again
            else {
                res.redirect('client-register')
            }
        })
    }
    catch (err) {
        console.log('error', err);
    }
}
// get client login page
exports.clientLoginForm = (req, res, next) => {
    const { firstName, lastName } = req.body;
    res.render('client/client-login', {
        path: `/client-login`,
        pageTitle: 'Login',
        clientName: `${firstName} ${lastName}`,
    })
}
// find client with login
exports.clientPostLogin = async (req, res, next) => {
    const { firstName, lastName, email, password} = req.body;
    try {
        // find client if exist or not 
        await ClientLogin.findOne({
            where: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }
        }).then((user) => {
            // if client already exist then logging in
            if (user) {
                req.session.firstName = firstName;
                req.session.lastName = lastName;
                // after login redirect to main page
                res.redirect(`/?clientName=${firstName} ${lastName}`);
            }
            // otherwise try to login again
            else {
                res.redirect(`/client-login`);
            }
        })
    } catch (err) {
        console.error('error', err);
    }
}