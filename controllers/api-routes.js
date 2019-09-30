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

module.exports = function(app) {
  // Get plan_users
  app.get("/api/plan-user-all", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.plan_user.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // Get plan
  app.get("/api/plan-all", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.plan.findAll({include: ['plan_user','plan_type']}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });
    
   // Get plan
   app.get("/api/life-chapter-full", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.life_chapter.findAll({
      include: ['invest_rate_type']
      // include: [
      //   {model: db.plan, include: [db.plan_user, db.plan_type]}
      // ]
      
      }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  }); 
  
};