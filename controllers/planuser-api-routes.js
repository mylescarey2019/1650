// *********************************************************************************
// this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var express = require('express');
// var router = express.Router();
var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {


  // get specific user, there plans user and its type
  app.get("/api/plan-user-plan/:id", function(req, res) {
    db.PlanUser.findOne({  
      where: { id: req.params.id },
      include: [{model: db.Plan, 
                   include: [{ model: db.LifeChapter }]
                  }]
                    }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // Get specific plan-user
  app.get("/api/plan-user/:id", function(req, res) {
    db.PlanUser.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all plan-user
  app.get("/api/plan-user", function(req, res) {
    db.PlanUser.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert plan-user
  app.post("/api/plan-user", function(req, res) {
    db.PlanUser.create({
      user_name: req.body.user_name
    }).then(function(results) {
      res.json(results);
    });
  });

  // update plan-user
  app.put("/api/plan-user", function(req, res) {
    db.PlanUser.update({
      user_name: req.body.user_name},
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete plan-user
  app.delete("/api/plan-user/:id", function(req, res) {
    db.PlanUser.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });

};