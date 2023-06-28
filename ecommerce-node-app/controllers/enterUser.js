const { User, LoginUser } = require('../models/userRegister');
const { NewTable } = require('../models/adminProduct');

const sequelize = require('../util/database');

exports.getRegister = (req, res, next) => {
    res.render('register-login/register', {
        path: '/register-panel',
        pageTitle: 'Admin Register'
    })
};

// Register new user with post method
exports.postRegister = async (req, res, next) => {
    // get names from ejs file with request body
    const { firstName, lastName, orgName, email, password } = req.body;
    try {
        // save orgName in new variable named tabledName
        const tableName = orgName;
        // If user already registered try register again otherwise create new row in user table
        User.findOrCreate({
            // find user if exist in user table
            where: {
                first_name: firstName,
                last_name: lastName,
                org_name: orgName,
                email: email,
                password: password
            }
        }).then(([user, created]) => {
            if (created) {
                // if created redirect login page
                res.redirect('/login');
                module.exports.tableName = tableName;
                //  save NewTable function from module to new variable to sync
                const Table = NewTable(tableName);
                Table.sync();

            } else {
                // if user already exist redirect to register panel ejs to register again
                res.redirect('/register-panel');
            }
        });
    } catch (err) {
        console.error(err);
    }
}
// get login ejs to login
exports.getLogin = (req, res, next) => { 
    res.render('register-login/login', {
        path: '/login',
        pageTitle: 'Admin Register'
    })
}
// login with post method
exports.postLogin = async (req, res, next) => {
    // get names of input fields with request body
    const { orgName, email, password } = req.body

    try {
        // find USer with findOne method
        await LoginUser.findOne({
            where: {
                org_name: orgName,
                email: email,
                password: password
            },
        }).then((user) => {
            // if User is in table then redirect to dashboard ejs where orgName is imported for url query
            if (user) {
                req.session.orgName = orgName;
                res.redirect(`/dashboard?orgName=${orgName}`)
            }
            // otherwise redirect to login again
            else {
                res.redirect('/login')
            }
        })
    }
    catch (err) {
        console.error(err);
    }
}


