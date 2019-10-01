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

  // get specific plan, its user and its type
  app.get("/api/plan-plan-user/:id", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.plan.findOne({  where: { id: req.params.id },
                      include: ['plan_user','plan_type']}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });


  // Get specific plan
  app.get("/api/plan/:id", function(req, res) {
    db.plan.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all plan
  app.get("/api/plan", function(req, res) {
    db.plan.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert plan
  app.post("/api/plan", function(req, res) {
    db.plan.create({
      plan_name: req.body.plan_name,
      planUserId: req.body.planUserId,
      planTypeId: req.body.planTypeId
    }).then(function(results) {
      res.json(results);
    });
  });

  // update plan
  app.put("/api/plan", function(req, res) {
    db.plan.update({
      plan_name: req.body.plan_name,
      planUserId: req.body.planUserId,
      planTypeId: req.body.planTypeId
      },
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete plan
  app.delete("/api/plan/:id", function(req, res) {
    db.plan.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });

};