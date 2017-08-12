var path = require("path");
var express = require("express");
var router = express.Router();
var db = require("../models");
const GoogleNewsRss = require('google-news-rss');
const googleNews = new GoogleNewsRss();


// Routes
// =============================================================
router.get("/", function(req, res) {
    googleNews
    .search("nfl", 10, "en")
    .then(resp = (data) => {
        var hbsObject = {news: data};
        res.render("index", hbsObject);
    }, function(err) {
        throw err;
    });
});
// router.post('/login',
// passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/',
//     failureFlash: true
// })
// );
router.post("/", function(req, res) {
db.User.create({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    teamOne: req.body.teamOne,
    teamTwo: req.body.teamTwo,
    teamThree: req.body.teamThree
}).then(function() {
    res.redirect("/");
});
});
router.get("/:id", function(req, res) {
db.User.findOne({
        where: {
            email: req.params.id
        }
    })
    .then(function(db) {
        res.json(db);
    });
});
module.exports = router;