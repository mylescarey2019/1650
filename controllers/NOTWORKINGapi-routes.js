// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var express = require('express');
// var router = express.Router();
var db = require("../models");

// Routes
// =============================================================

module.exports = function(router) {
  // Get plan_users
  router.get("/api/plan-user-all", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.plan_user.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // // Get plan
  // router.get("/api/plan-all", function(req, res) {

  //   // Finding all plan_users, and then returning them  as JSON.
  //   db.plan.findAll({}).then(function(results) {
  //     // results are available to us inside the .then
  //     res.json(results);
  //   });
  // });
  
};