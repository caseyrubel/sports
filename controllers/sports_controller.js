var path = require("path");
var express = require("express");
var router = express.Router();
var passport = require('../config/passport.js')
    // Import the model (cat.js) to use its database functions.
var db = require("../models");
var StattleshipAPI = require('node-stattleship');
var stattleship = new StattleshipAPI('9798a298a32d764f862028f5489e5276');
var params = {
    on: "today"
};
// Routes
// =============================================================
router.get("/", function(req, res) {
    db.User.findAll({})
        .then(function() {
            stattleship.games('baseball', 'mlb', params).then(function(games) {
                var hbsObject = { stuff: games };
                res.render('index', hbsObject);
            });
        });
});
router.get("/home", function(req, res) {
    db.User.findAll({})
        .then(function() {
            res.render("index");
        });
});
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })
);
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