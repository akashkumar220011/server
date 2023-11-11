const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000;
const { connectMongoose } = require('./config/mongoose');
connectMongoose();

const expressLayouts = require('express-ejs-layouts');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//to read post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session ({
    name: 'WoW',
    // Todo change the screate key before deployement
    secret: 'omgWhatsHappen',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => console.log(`App listening on port ${port}!`))