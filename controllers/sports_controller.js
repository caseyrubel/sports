var path = require("path");
var express = require("express");
var router = express.Router();
// Import the model (cat.js) to use its database functions.
var cat = require("../models");
// Routes
// =============================================================
router.get("/", function(req, res) {
    res.render("index");
});
module.exports = router;