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
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))







const sessionStore = new MongoStore({
    mongoUrl: 'mongodb://localhost:27017/WoW',
    mongooseConnection: connectMongoose(),
    autoRemove: 'disabled'
},(err)=>{
    if(err){
        console.error('Mongostore Error:', err);
    }
});
//to read post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session ({
    name: 'WoW',
    // Todo change the screate key before deployement
    secret: 'omgWhatsHappen',
    saveUninitialized: false,
    resave:false,
    store: sessionStore,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));

app.listen(port, () => console.log(`App listening on port ${port}!`))