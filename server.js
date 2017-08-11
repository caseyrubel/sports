//App depencencies -----------------------------------------/
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser')
var path = require('path');
var passport = require('passport');
var passportConfig = require('./config/passport');
var flash = require('connect-flash');


//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'asdfqwer',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session());


//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Route config -------------------------------------------/
routes = require('./controllers/sports_controller.js');

//Database config ---------------------------------------/
var db = require('./models');

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

app.use("/", routes)

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
    app.listen(PORT, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        }
    });
});