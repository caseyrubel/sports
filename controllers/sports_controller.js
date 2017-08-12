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
router.get("/home", function(req, res) {
     console.log(news);
    // console.log("this is my bacon", bacon);
    res.render("index");
});
router.post("/", function(req, res) {
    console.log(req.body.first_name);
})
module.exports = router;