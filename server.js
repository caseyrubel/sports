//App depencencies -----------------------------------------/
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
var path = require('path');


//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

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