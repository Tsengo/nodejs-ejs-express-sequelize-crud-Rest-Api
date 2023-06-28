// import from package.json and save them their specific variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();

// const sequelize = require('./util/database')
// touch files in route to make routes accessible
const enterUser = require('./routes/enterUser');
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client/product/main');
const clientForm = require('./routes/client/clientForm')
const errorController = require('./controllers/error');  
// set engine to read ejs file
app.set('view engine', 'ejs');
// set file to read ejs file from views file
app.set('views', 'views');
// Use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
// create static movement to save automatically image in resource/upload folder
app.use('/resources/upload', express.static('./resources/upload'))
// Create static movement to use publicly other files for ejs files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
// User files from route
app.use(adminRoutes)
app.use(enterUser)
app.use('/', clientRoutes)
app.use(clientForm)
app.use(errorController.get404)
// Go to port 8000
app.listen(8000);